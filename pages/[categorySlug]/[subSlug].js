

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

/* ─── Product Grid ─────────────────────────────────────────── */
function ProductGrid({ products }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="col-12">
        <p className="text-muted">No products found in this subcategory.</p>
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
const SubCategoryPage = ({ parentCategory, subcategory, products, faq, error }) => {
  if (error)        return <p className="text-danger container py-5">{error}</p>;
  if (!subcategory) return <p className="text-warning container py-5">Subcategory not found.</p>;

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

  const displaySectionDesc = subcategory.sectionDescription || subcategory.sectiondescription || '';
  const displayDescription = subcategory.description?.trim() || '';

  const rawSubFaqs = (faq && Array.isArray(faq) && faq.length > 0)
    ? faq
    : (Array.isArray(subcategory?.faqs) && subcategory.faqs.length > 0
      ? subcategory.faqs
      : (Array.isArray(parentCategory?.faqs) ? parentCategory.faqs : []));
  const subcategoryFaqs = rawSubFaqs.filter(
    (f) => f && (f.title || f.question) && (f.description || f.answer)
  );

  // Canonical: /[parentSlug]/[subSlug]/  — fully dynamic, no hardcoded "memorials"
  const canonicalUrl = parentCategory
    ? `${BASE_SITE}${parentCategory.slug}/${subcategory.slug}/`
    : `${BASE_SITE}${subcategory.slug}/`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_SITE },
      ...(parentCategory
        ? [{ '@type': 'ListItem', position: 2, name: parentCategory.title, item: `${BASE_SITE}${parentCategory.slug}/` }]
        : []),
      { '@type': 'ListItem', position: parentCategory ? 3 : 2, name: subcategory.title, item: canonicalUrl },
    ],
  };

  return (
    <>
      <Head>
        <title>{subcategory.metaTitle || subcategory.title}</title>
        <meta name="description" content={subcategory.metaDescription || subcategory.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        {subcategory.metaKeywords && <meta name="keywords" content={subcategory.metaKeywords} />}
        <meta property="og:title"       content={subcategory.metaTitle || subcategory.title} />
        <meta property="og:description" content={subcategory.metaDescription || subcategory.excerpt || ''} />
        <meta property="og:site_name"   content="Stone Discover UK" />
        <meta property="og:image"       content={canonicalImg(subcategory.featuredimage)} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {subcategoryFaqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: subcategoryFaqs
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
        {Array.isArray(subcategory.schemaMarkup) &&
          subcategory.schemaMarkup.map((s, i) => {
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
                <h1><span>{subcategory.title}</span></h1>
                <p>{subcategory.shortdescription}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-banner-two-image">
                <Image width={563} height={563} src={imgBanner(subcategory.image)} alt={subcategory.title} className="img-fluid" />
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

      {/* ── Products Section ── */}
      <section className="p-t-30">
        <div className="container py-4 m-p-08">

          {/* Breadcrumb: Home > Parent Category > Subcategory */}
          <div className="row">
            <div className="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ background: 'none', padding: '8px 0', fontSize: '14px', marginBottom: 0 }}>
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  {parentCategory && (
                    <li className="breadcrumb-item">
                      <Link href={`/${parentCategory.slug}/`}>{parentCategory.title}</Link>
                    </li>
                  )}
                  <li className="breadcrumb-item active">
                    <span>{subcategory.title}</span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="about-us-content">
                <h2>Our Products</h2>
              </div>
            </div>
          </div>

          <div className="row g-3 mt-2 sliding-row-05">
            <ProductGrid products={products} />
          </div>

        </div>
      </section>

      {/* ── About Section ── */}
      <section className="about-us-section p-t-80 p-b-40 p-t-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-us-content">
                <h2>About {subcategory.title}</h2>
                {subcategory.extdesc && <div dangerouslySetInnerHTML={{ __html: subcategory.extdesc }} />}
                <button onClick={handleReadMore} className="btn btn-four m-t-30">Read More</button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-us-image">
                <Image width={563} height={563} src={imgAbout(subcategory.aboutusimage)} alt={subcategory.title} className="img-fluid" />
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
                <Image width={555} height={440} src={imgPartner(subcategory.ctaimage)} alt={subcategory.title} className="img-fluid" />
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
                        <p>Distributing across the UK from Southampton, Liverpool, Birmingham, Manchester, London, Edinburgh, Glasgow, and more.</p>
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
      {subcategoryFaqs && subcategoryFaqs.length > 0 && (
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
                <FaqAccordionComon faqList={subcategoryFaqs} categoryData={subcategory} />
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
                <p>Whether you're a high-volume buyer or expanding your product line, our team supports your growth with trust, consistency, and partnership.</p>
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

    if (!Array.isArray(allCats)) return { paths: [], fallback: 'blocking' };

    const paths = [];
    for (const cat of allCats) {
      if (!cat.parent) continue; // skip root categories — handled by index.js

      // Get the parent's slug
      const parentId  = typeof cat.parent === 'object' ? cat.parent._id : cat.parent;
      const parentCat = allCats.find((c) => String(c._id) === String(parentId));

      if (parentCat) {
        paths.push({
          params: {
            categorySlug: parentCat.slug,
            subSlug:      cat.slug,
          },
        });
      }
    }

    return { paths, fallback: 'blocking' };
  } catch (err) {
    console.error('[categorySlug]/[subSlug] getStaticPaths error:', err.message);
    return { paths: [], fallback: 'blocking' };
  }
}


export async function getStaticProps({ params }) {
  const { categorySlug, subSlug } = params;

  try {
 
    let subcategory    = null;
    let parentCategory = null;
    let products       = [];

    if (process.env.NEXT_PUBLIC_PRODUCTS_CATEGORY_URL) {
      try {
        const newRes = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCTS_CATEGORY_URL}/${categorySlug}/${subSlug}`
        );
        if (newRes.ok) {
          const newData = await newRes.json();
          // The API returns { parentCategory, subcategory, products }
          if (newData?.subcategory || newData?.category) {
            subcategory = newData.subcategory || newData.category;
            products    = newData.products || [];
          }
          if (newData?.parentCategory) {
            parentCategory = newData.parentCategory;
          }
        } else if (newRes.status === 404) {
        
          return { notFound: true };
        }
      } catch (e) {
        console.error('New productscategory sub endpoint failed (falling back):', e.message);
      }
    }

    // Fallback to old categorydetails endpoint
    if (!subcategory) {
      const subRes = await fetch(`${process.env.NEXT_PUBLIC_DETSILS_URL}/${subSlug}`);
      if (!subRes.ok) return { notFound: true };
      const subData = await subRes.json();
      if (!subData?.category) return { notFound: true };
      subcategory = subData.category;
      products    = subData.products || [];
    }

    // ── Step 2: Fetch parent category (if not already provided by new endpoint) ──
    if (!parentCategory && process.env.NEXT_PUBLIC_PRODUCTS_CATEGORY_URL) {
      try {
        const parentNewRes = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCTS_CATEGORY_URL}/${categorySlug}`
        );
        if (parentNewRes.ok) {
          const parentNewData = await parentNewRes.json();
          if (parentNewData?.category) {
            parentCategory = parentNewData.category;
          }
        } else if (parentNewRes.status === 404) {
          return { notFound: true };
        }
      } catch (e) {
        console.error('Parent via new endpoint failed (falling back):', e.message);
      }
    }

    // Fallback: old categorydetails endpoint for parent
    if (!parentCategory) {
      try {
        const parentRes = await fetch(`${process.env.NEXT_PUBLIC_DETSILS_URL}/${categorySlug}`);
        if (!parentRes.ok) return { notFound: true };
        const parentData = await parentRes.json();
        if (parentData?.category) parentCategory = parentData.category;
      } catch (e) {
        console.error('Parent category fallback fetch failed:', e.message);
        return { notFound: true };
      }
    }

    // ── Step 3: Strict validation of parent-child relationship ─────────
    // 1. Both parentCategory and subcategory must exist
    if (!parentCategory || !subcategory) {
      return { notFound: true };
    }

    // 2. Parent slug must match the requested categorySlug
    if (parentCategory.slug !== categorySlug) {
      return { notFound: true };
    }

    // 3. Subcategory MUST have a parent field
    if (!subcategory.parent) {
      return { notFound: true };
    }

    // 4. Verify subcategory actually belongs to this parent category
    const subParentId = typeof subcategory.parent === 'object'
      ? subcategory.parent._id
      : subcategory.parent;
    const subParentSlug = typeof subcategory.parent === 'object'
      ? subcategory.parent.slug
      : null;

    const matchesId   = subParentId && String(subParentId) === String(parentCategory._id);
    const matchesSlug = subParentSlug && String(subParentSlug) === String(categorySlug);

    if (!matchesId && !matchesSlug) {
      return { notFound: true };
    }

    return {
      props: {
        parentCategory,
        subcategory,
        products: products || [],
        faq: subcategory?.faqs || parentCategory?.faqs || null,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error('[categorySlug]/[subSlug] getStaticProps error:', err.message);
    return {
      props: {
        parentCategory: null,
        subcategory:    null,
        products:       [],
        error:          'Something went wrong while loading this page.',
      },
      revalidate: 60,
    };
  }
}

export default SubCategoryPage;
