

import React, { useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';
import ModelBox from '@/components/ModelBox';
import FaqAccordionComon from '@/components/FaqAccordionComon';

/* ─── Helpers ──────────────────────────────────────────────── */
const BASE_IMAGE = process.env.NEXT_PUBLIC_IMAGE || '';
const BASE_SITE  = process.env.NEXT_PUBLIC_SITE_URL || '';

const imgUrl = (img, fallback = '/img/webpages/product-01.jpg') =>
  img ? `${BASE_IMAGE}/${img}` : fallback;

const imgAbout   = (img) => imgUrl(img, '/img/webpages/about-us-pic.png');
const imgPartner = (img) => imgUrl(img, '/img/webpages/headstones-pic.png');
const imgBanner  = (img) => imgUrl(img, '/img/webpages/product-01.jpg');

const firstProductImage = (images) => {
  if (!images) return null;
  if (Array.isArray(images)) return images[0] || null;
  return String(images).split(' ')[0] || null;
};

const canonicalImg = (img) => {
  if (!img) return `${BASE_SITE}img/stone-og-inne.jpeg`;
  if (img.startsWith('http')) return img;
  return `${BASE_IMAGE.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
};

/* ─── Subcategory Grid ─────────────────────────────────────── */
function SubcategoryGrid({ parentSlug, subcategories }) {
  return (
    <>
      {subcategories.map((sub) => (
        <div className="col-lg-3 col-md-4 col-sm-6 sliding-col-05" key={sub._id}>
          <div className="card-06">
            <div className="card-06-item">
              <a href={`/${parentSlug}/${sub.slug}/`}>
                <Image
                  src={imgUrl(sub.categoryicon)}
                  alt={sub.title}
                  width={300}
                  height={300}
                  className="img-fluid"
                />
                <span>{sub.title}</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* ─── Product Grid ─────────────────────────────────────────── */
function ProductGrid({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="col-12">
        <p className="text-muted">No products found in this category.</p>
      </div>
    );
  }
  return (
    <>
      {products.map((product) => (
        <div className="col-lg-3 col-md-4 col-sm-6 sliding-col-05" key={product._id}>
          <div className="card-06">
            <div className="card-06-item">
              <a href={`/product/${product.slug}/`}>
                <Image
                  width={300}
                  height={200}
                  src={imgUrl(firstProductImage(product.images))}
                  alt={product.title}
                  className="img-fluid"
                />
                <span>{product.title}</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  PAGE COMPONENT                                             */
/* ═══════════════════════════════════════════════════════════ */
const CategoryPage = ({ category, products, subcategories, faq, error }) => {
  if (error)     return <p className="text-danger container py-5">{error}</p>;
  if (!category) return <p className="text-warning container py-5">Category not found.</p>;

  /* accordion state */
  const [openDesc,    setOpenDesc]    = useState('');
  const [openPartner, setOpenPartner] = useState('1');
  const toggleDesc    = (id) => setOpenDesc((p)    => (p === id ? '' : id));
  const togglePartner = (id) => setOpenPartner((p) => (p === id ? '' : id));

  const descRef = useRef(null);
  const handleReadMore = useCallback(() => {
    setOpenDesc('desc');
    setTimeout(() => descRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }, []);

  const hasSubcategories = Array.isArray(subcategories) && subcategories.length > 0;
  const displaySectionDesc = category.sectionDescription || category.sectiondescription || '';
  const displayDescription = category.description?.trim() || '';
  const canonicalUrl = `${BASE_SITE}${category.slug}/`;

  const categoryFaqs = (faq && Array.isArray(faq) && faq.length > 0)
    ? faq
    : (Array.isArray(category?.faqs) ? category.faqs : []);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: BASE_SITE },
      { '@type': 'ListItem', position: 2, name: category.title,   item: canonicalUrl },
    ],
  };

  return (
    <>
      <Head>
        <title>{category.metaTitle || category.title}</title>
        <meta name="description" content={category.metaDescription || category.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        {category.metaKeywords && <meta name="keywords" content={category.metaKeywords} />}
        <meta property="og:title"       content={category.metaTitle || category.title} />
        <meta property="og:description" content={category.metaDescription || category.excerpt || ''} />
        <meta property="og:site_name"   content="Stone Discover UK" />
        <meta property="og:image"       content={canonicalImg(category.featuredimage)} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {categoryFaqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: categoryFaqs
                  .filter((f) => (f.title || f.question) && (f.description || f.answer))
                  .map((f) => ({
                    '@type': 'Question',
                    name: f.title || f.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: (f.description || f.answer).replace(/<[^>]+>/g, ''),
                    },
                  })),
              }),
            }}
          />
        )}
        {Array.isArray(category.schemaMarkup) &&
          category.schemaMarkup.map((s, i) => {
            try { JSON.parse(s); } catch { return null; }
            return <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: s }} />;
          })}
      </Head>

      {/* ── Hero Banner ── */}
      <div
        className="hero-banner-two"
        style={{ backgroundImage: 'url("/img/banner/hero-banner-02.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-end">
              <div className="hero-banner-two-head">
                <h1><span>{category.title}</span></h1>
                <p>{category.shortdescription}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-banner-two-image">
                <Image width={563} height={563} src={imgBanner(category.image)} alt={category.title} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Optional Section Description ── */}
      {displaySectionDesc && (
        <section className="p-t-40">
          <div className="container">
            <div className="col-lg-12">
              <div dangerouslySetInnerHTML={{ __html: displaySectionDesc }} />
            </div>
          </div>
        </section>
      )}

      {/* ── Subcategories OR Products ── */}
      <section className="p-t-30">
        <div className="container py-4 m-p-08">

          {/* Breadcrumb: Home > Category */}
          <div className="row">
            <div className="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ background: 'none', padding: '8px 0', fontSize: '14px', marginBottom: 0 }}>
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active"><span>{category.title}</span></li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="about-us-content">
                <h2>{hasSubcategories ? `Our ${category.title} Types` : 'Our Products'}</h2>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-2 sliding-row-05">
            {hasSubcategories ? (
              <SubcategoryGrid parentSlug={category.slug} subcategories={subcategories} />
            ) : (
              <ProductGrid products={products} />
            )}
          </div>

        </div>
      </section>

      {/* ── About Section ── */}
      <section className="about-us-section p-t-80 p-b-40 p-t-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-us-content">
                <h2>About {category.title}</h2>
                {category.extdesc && <div dangerouslySetInnerHTML={{ __html: category.extdesc }} />}
                <button onClick={handleReadMore} className="btn btn-four m-t-30">Read More</button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-us-image">
                <Image width={563} height={563} src={imgAbout(category.aboutusimage)} alt={category.title} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full Description Accordion ── */}
      <section className="p-t-20 p-b-40" ref={descRef}>
        <div className="container">
          <div className="accordion-one accordion-one-product accordion-one-product-new">
            <Accordion open={openDesc} toggle={toggleDesc}>
              <AccordionItem>
                <AccordionBody accordionId="desc">
                  {displayDescription
                    ? <div dangerouslySetInnerHTML={{ __html: displayDescription }} />
                    : <p>No additional details available.</p>}
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Partner Section ── */}
      <section className="partner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-left p-b-20">
                <h2 className="m-b-30">Why Partner with Us?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="partner-pic">
                <Image width={555} height={440} src={imgPartner(category.ctaimage)} alt={category.title} className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="form-left">
                <div className="accordion-one accordion-one-product">
                  <Accordion open={openPartner} toggle={togglePartner}>
                    <AccordionItem>
                      <AccordionHeader targetId="1">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3><img src="/img/icons/faq-icon-01.png" alt="faq-icon" />Direct Manufacturer Advantage</h3>
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="1">
                        <p>We own and operate our production facilities in India — no middlemen, no markups, just direct supply to your business.</p>
                        <ul>
                          <li>Competitive B2B wholesale pricing on every order</li>
                          <li>Flexible customisation on shapes, sizes, and finishes</li>
                          <li>Faster production turnaround and smooth logistics</li>
                          <li>Full control over quality from quarry to dispatch</li>
                        </ul>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="2">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3><img src="/img/icons/faq-icon-02.png" alt="faq-icon" />Consistent Quality, Every Time</h3>
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="2">
                        <p>Crafted from premium-grade Indian granite through a multi-stage quality check covering surface finishing, dimensional accuracy, structural integrity, and engraving-ready panel preparation.</p>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="3">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3><img src="/img/icons/faq-icon-03.png" alt="faq-icon" />Bespoke Designs</h3>
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="3">
                        <p>Full customisation across headstones, kerbsets, vases, urns, angel memorials, children memorials, heart headstones, and memorial benches — all engraving-ready.</p>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="4">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3><img src="/img/icons/faq-icon-04.png" alt="faq-icon" />Seamless Logistics &amp; Delivery</h3>
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="4">
                        <p>Distributing across the UK from Southampton, Liverpool, Birmingham, Manchester, London, Edinburgh, Glasgow, and more — on time, every time.</p>
                      </AccordionBody>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-t-60">
            <div className="col-lg-12">
              <div className="card-05">
                {[
                  ['Quality Craftmanship',  '/img/icons/icons-1.png'],
                  ['Nationwide Delivery',   '/img/icons/icons-2.png'],
                  ['24*7 Customer Service', '/img/icons/icons-3.png'],
                  ['Custom Designs',        '/img/icons/icons-4.png'],
                  ['Experienced Masons',    '/img/icons/icons-5.png'],
                ].map(([label, src]) => (
                  <div className="card-05-item" key={label}>
                    <img src={src} alt={label} className="img-fluid" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dynamic FAQ Section ── */}
      {categoryFaqs && categoryFaqs.length > 0 && (
        <section className="faq-section p-t-60 p-b-40">
          <div className="container bottom-form">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="heading-center p-b-40">
                  <h2 className="m-b-30">Frequently Asked <span>Questions</span></h2>
                </div>
              </div>
            </div>
            <div className="row bg-gray justify-content-center">
              <div className="col-lg-10">
                <FaqAccordionComon faqList={categoryFaqs} categoryData={category} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Section ── */}
      <section className="p-t-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="heading-center p-b-40">
                <h2 className="m-b-30">Join Hands with a Reliable <span>Memorial Supplier</span></h2>
                <p>Whether you're a high-volume buyer or expanding your product line, our team is here to support your growth with trust, consistency, and partnership.</p>
              </div>
              <div className="button-center-new text-center">
                <ModelBox className="btn-three" headerText="Scale Your Store!" buttonText="Request a Quote" />
                <a className="btn-four btn-four-cc" href="/catalog-download">Request Catalogue</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════ */
/*  DATA FETCHING                                              */
/* ═══════════════════════════════════════════════════════════ */

export async function getStaticPaths() {
  try {
    const baseUrl = (process.env.NEXT_PUBLIC_PRODUCTS_CATEGORY_URL || '').replace(/\/productscategory\/?$/, '');
    const categoriesApiUrl = baseUrl
      ? `${baseUrl}/categories`
      : process.env.NEXT_PUBLIC_PRODUCT_CATEGORY_API_URL;

    const res = await fetch(categoriesApiUrl);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const allCats = await res.json();

    const paths = Array.isArray(allCats)
      ? allCats
          .filter((cat) => !cat.parent)
          .map((cat) => ({ params: { categorySlug: cat.slug } }))
      : [];

    return { paths, fallback: 'blocking' };
  } catch (err) {
    console.error('[categorySlug]/index getStaticPaths error:', err.message);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const { categorySlug } = params;

  try {

    let category = null;
    let products  = [];
    let subcategoriesFromNewEndpoint = [];

    try {
      const newRes = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCTS_CATEGORY_URL}/${categorySlug}`
      );
      if (newRes.ok) {
        const newData = await newRes.json();
        if (newData?.category) {
          category = newData.category;
          products  = newData.products || [];
          // New endpoint may also return subcategories directly
          if (Array.isArray(newData.subcategories)) {
            subcategoriesFromNewEndpoint = newData.subcategories;
          }
        }
      }
    } catch (e) {
      console.error('NEXT_PUBLIC_PRODUCTS_CATEGORY_URL failed (falling back):', e.message);
    }

    // Fallback to old categorydetails endpoint
    if (!category) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DETSILS_URL}/${categorySlug}`);
      if (!res.ok) return { notFound: true };
      const data = await res.json();
      if (!data?.category) return { notFound: true };
      category = data.category;
      products  = data.products || [];
    }

 
    let subcategories = subcategoriesFromNewEndpoint;

    if (subcategories.length === 0) {
      try {
        
        const baseUrl = (process.env.NEXT_PUBLIC_PRODUCTS_CATEGORY_URL || '').replace(/\/productscategory\/?$/, '');
        const categoriesApiUrl = baseUrl
          ? `${baseUrl}/categories`
          : process.env.NEXT_PUBLIC_PRODUCT_CATEGORY_API_URL;

        const allRes = await fetch(categoriesApiUrl);
        if (allRes.ok) {
          const allCats = await allRes.json();
          if (Array.isArray(allCats)) {
            subcategories = allCats.filter((cat) => {
              if (!cat.parent) return false;
              const pid = typeof cat.parent === 'object' ? cat.parent._id : cat.parent;
              return String(pid) === String(category._id);
            });
          }
        }
      } catch (e) {
        console.error('Subcategory fallback fetch failed (non-fatal):', e.message);
      }
    }

    return {
      props: {
        category,
        products:      products      || [],
        subcategories: subcategories || [],
        faq:           category?.faqs || null,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error('[categorySlug]/index getStaticProps error:', err.message);
    return {
      props: {
        category:      null,
        products:      [],
        subcategories: [],
        error:         'Something went wrong while loading this page.',
      },
      revalidate: 60,
    };
  }
}

export default CategoryPage;
