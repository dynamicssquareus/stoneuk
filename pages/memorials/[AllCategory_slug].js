import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
import Image from 'next/image';
import ModelBox from '@/components/ModelBox';
import { useRouter } from 'next/router';
const getImageUrl = (img) =>
  img ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}` : '/img/webpages/product-01.jpg'

const getImageUrlBanner = (img) =>
  img ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}` : '/img/webpages/product-01.jpg'

const CategoryPage = ({ category, products, faq, error }) => {
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!category) {
    return <p className="text-warning">Category not found.</p>;
  }

  /*accordian code for description*/
  const [openDesc, setOpenDesc] = useState('');
  const toggleDesc = (id) => {
    if (openDesc === id) {
      setOpenDesc('');
    } else {
      setOpenDesc(id);
    }
  };

  /*accordian code for partner section*/
  const [openPartner, setOpenPartner] = useState('1');
  const togglePartner = (id) => {
    if (openPartner === id) {
      setOpenPartner('');
    } else {
      setOpenPartner(id);
    }
  };

  /*meta code*/

  // Read More -> scroll & open behaviour
  const descRef = useRef(null);
  const handleReadMore = (e) => {
    e && e.preventDefault();
    setOpenDesc('desc');
    if (descRef.current) {
      setTimeout(() => {
        descRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // adjust for fixed header if needed:
        // window.scrollBy(0, -80);
      }, 50);
    }
  };

  const router = useRouter();
  const { AllCategory_slug } = router.query;

  // Prefer subcategory content if subcategory exists, otherwise fall back to category
  const primary = category || {};

  const displayDescription = primary.description?.trim() || '';

  const displayExtaDesc = primary.extdesc || '';

  const displayShortDesc = primary.shortdescription || '';

  const displayHeroImage = primary.image || primary.featuredimage || '';


  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!category) {
    return <p className="text-warning">Category not found.</p>;
  }

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}memorials/${category.slug}/`;
  const CanImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${process.env.NEXT_PUBLIC_IMAGE.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  return (
    <>
      <Head>
        <title>{category.metaTitle || category.title}</title>
        <meta name="description" content={category.metaDescription || category.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        {category.metaKeywords && <meta name="keywords" content={category.metaKeywords} />}
        <meta property="og:title" content={category.metaTitle || category.title} />
        <meta property="og:description" content={category.metaDescription || category.excerpt || ''} />
        <meta property="og:site_name" content="Stone Discover UK" />
        <meta
          property="og:image"
          content={
            category.featuredimage
              ? CanImageUrl(category.featuredimage)
              : `${process.env.NEXT_PUBLIC_SITE_URL}img/stone-og-inne.jpeg`
          }
        />
      </Head>

      <div className='hero-banner-two' style={{ backgroundImage: 'url("/img/banner/hero-banner-02.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 align-self-end'>
              <div className='hero-banner-two-head '>
                <h1><span>{category.title}</span></h1>
                <p>{category.shortdescription}</p>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='hero-banner-two-image'>
                <Image
                  width={563}
                  height={563}
                  src={getImageUrlBanner(category.image)}
                  alt={category.title}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='p-t-30'>
        <div className="container py-4 m-p-08">

          <div className="row mt-4">
            <div className='col-lg-12'>
              <div className='about-us-content'>
                <h2>Our Products</h2>
              </div>

            </div>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <div className="col-lg-3 sliding-col-05" key={product._id}>
                  <div className="card-06">
                    <div className="card-06-item">
                      <a href={`/product/${product.slug}`}>
                        <Image
                          width={300}
                          height={200}
                          src={getImageUrl(product.images?.[0])}
                          alt={product.title}
                          className="img-fluid"
                        />
                        <span>{product.title}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted">No products found in this category.</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* <section className='about-us-section p-t-80 p-b-40 p-t-40'>
        <div className='container'>
          <div className='row'>

            <div className='col-lg-6'>
              <div className='about-us-content'>
                <h2>About {category.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: category.description }}>{ }</div>
                <a href='/about-us/' className='btn btn-four m-t-30'>Read More</a>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='about-us-image'>
                <img src='/img/webpages/about-us-pic.png' alt='About Us' className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="about-us-section p-t-80 p-b-40 p-t-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-us-content">
                <h2>About {primary.title || category?.title}</h2>

                {displayExtaDesc ? (
                  <div dangerouslySetInnerHTML={{ __html: displayExtaDesc }} />
                ) : null}

                <button onClick={handleReadMore} className="btn btn-four m-t-30">
                  Read More
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-us-image">
                <img src="/img/webpages/about-us-pic.png" alt="About Us" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description target */}
      <section className="p-t-20 p-b-40" ref={descRef}>
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-12">
              <div className="heading-left p-b-20">
                <h2 className="m-b-30">Full Description</h2>
              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="accordion-one accordion-one-product accordion-one-product-new">
                <Accordion open={openDesc} toggle={toggleDesc}>
                  <AccordionItem>

                    <AccordionBody accordionId="desc">
                      {displayDescription ? (
                        <div dangerouslySetInnerHTML={{ __html: displayDescription }} />
                      ) : (
                        <p>No additional details available.</p>
                      )}
                    </AccordionBody>
                    {/* <AccordionHeader targetId="desc">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <h3>About {primary.title || category?.title} — Details</h3>
                      </div>
                    </AccordionHeader> */}
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='partner-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='heading-left p-b-20'>
                <h2 className='m-b-30'>Why Partner with Us?</h2>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-6 align-self-center'>
              <div className='partner-pic'>
                <img src='/img/webpages/headstones-pic.png' alt='partent-side-pic' />
              </div>
            </div>
            <div className='col-lg-6 align-self-center'>
              <div className='form-left'>
                <div className='accordion-one accordion-one-product'>
                  <Accordion open={openPartner} toggle={togglePartner}>
                    <AccordionItem>
                      <AccordionHeader targetId="1">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3><img src='/img/icons/faq-icon-01.png' alt='faq-icon' />Direct Manufacturer Advantage</h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                     {open === '1' ? '-' : '+'}
                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="1">
                        <p>We own and operate our production facilities in India — no middlemen, no markups, just direct supply to your business.</p>
                        <p><b>What this means for you:</b></p>
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
                          <h3><img src='/img/icons/faq-icon-02.png' alt='faq-icon' />Consistent Quality, Every Time</h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                     {open === '1' ? '-' : '+'}
                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="2">
                        <p>Every piece that leaves our facility is built to last — and built to impress.
                          Our memorials are crafted from premium-grade Indian granite, renowned worldwide for its density, weather resistance, and timeless finish. Each product goes through a multi-stage quality check covering:
                        </p>
                        <ul>
                          <li>Surface finishing and polish consistency</li>
                          <li>Dimensional accuracy to your specifications</li>
                          <li>Structural integrity for outdoor durability</li>
                          <li>Engraving-ready panel preparation</li>

                        </ul>
                        <p>When your customers receive a Stone Discover product, it reflects the standard your business stands for.
                        </p>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="3">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3><img src='/img/icons/faq-icon-03.png' alt='faq-icon' />Bespoke Designs</h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                     {open === '1' ? '-' : '+'}
                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="3">
                        <p>Your customers have unique needs. We make sure you can meet every one of them.</p>
                        <p><b>We support full customisation across our entire product range, including:
                        </b></p>
                        <ul>
                          <li>Headstones (upright, flat, kerb sets)</li>
                          <li>Kerbsets</li>
                          <li>Vases and Urns</li>
                          <li>Angel Memorials</li>
                          <li>Children Memorials</li>
                          <li>Heart Headstones</li>
                          <li>Memorial Benches</li>
                        </ul>
                        <p>All designs come engraving-ready, and we welcome custom shapes, sizes, granite colours, and sculpted details. Whether you need a one-off bespoke piece or a bulk order in a specific style — we deliver.</p>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="4">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3><img src='/img/icons/faq-icon-04.png' alt='faq-icon' />Seamless Logistics & Delivery</h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                     {open === '1' ? '-' : '+'}
                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="4">
                        <p>From our production floor to your door — reliable, trackable, and hassle-free.
                          Stone Discover UK supplies granite memorials across the entire UK with warehouse distribution from:</p>
                        <p><b>Southampton · Liverpool · Birmingham · Blackpool · Manchester · Wales · London · Edinburgh · Glasgow · Aberdeen · Scotland
                        </b></p>
                        <p>We guarantee:
                        </p>
                        <ul>
                          <li>On-time delivery to your location</li>
                          <li>Proper transport coordination for fragile stone products</li>
                          <li>Hassle-free customs handling (for international orders)</li>
                          <li>Bulk order dispatch with flexible lead times</li>
                        </ul>
                        <p>Whether you're a memorial mason, retail monument supplier, or wholesale distributor — our logistics network is built to keep your business moving.</p>
                      </AccordionBody>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='p-b-100 p-t-80 m-p-07'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Memorial Collection <span>Crafted</span> for All</h2>
                <p>We offer a wide range of expertly crafted memorial designs to suit every need and occasion. From classic headstones and kerbsets to elegant bench and heart memorials, our collection also includes vases, urns, angel tributes, and dedicated children's memorials. Each piece is made with care, precision, and a deep respect for the memories it honors. Contact us directly for competitive quotes and tailored solutions.</p>
              </div>
            </div>
          </div>
          <div className='row g-2 sliding-row'>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/benches/">
                    <img src='/img/webpages/pic-07.jpg' alt='About Us' className='img-fluid' />
                    <h4>Bench</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/kerb-sets/">
                    <img src='/img/webpages/pic-08.jpg' alt='About Us' className='img-fluid' />
                    <h4>Kerbsets</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/vases/">
                    <img src='/img/webpages/pic-09.jpg' alt='About Us' className='img-fluid' />
                    <h4>Flower Vases</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/urns/">
                    <img src='/img/webpages/pic-10.jpg' alt='About Us' className='img-fluid' />
                    <h4>Urns</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2 col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/angel-headstone/">
                    <img src='/img/webpages/pic-11.jpg' alt='About Us' className='img-fluid' />
                    <h4>Angel Headstones</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-2  col-md-4 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/childrens-headstones/">
                    <img src='/img/webpages/pic-12.jpg' alt='About Us' className='img-fluid' />
                    <h4>Children Memorial</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='p-t-20 '>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Join Hands with a Reliable <span>Tombstone Supplier</span></h2>
                <p>Whether you're a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
              </div>
              <div className='button-center-new text-center'>
                <ModelBox className='btn-three' headerText="Scale Your Store! " buttonText="Request a Quote" />
                <a className='btn-four btn-four-cc' href="/catalog-download">Request Catalogue</a>

              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='p-b-30 p-t-80 m-p-09'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Why Choose Us?</h2>
                <p>Whether you're a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
              </div>

            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <div className='card-05'>
                <div className='card-05-item'>
                  <img src='/img/icons/icons-1.png' alt='About Us' className='img-fluid' />
                  <span>Quality Craftmanship</span>
                </div>
                <div className='card-05-item'>
                  <img src='/img/icons/icons-2.png' alt='About Us' className='img-fluid' />
                  <span>Nationwide Delivery</span>
                </div>
                <div className='card-05-item'>
                  <img src='/img/icons/icons-3.png' alt='About Us' className='img-fluid' />
                  <span>24*7 Customer Service</span>
                </div>
                <div className='card-05-item'>
                  <img src='/img/icons/icons-4.png' alt='About Us' className='img-fluid' />
                  <span>Custom Designs</span>
                </div>
                <div className='card-05-item'>
                  <img src='/img/icons/icons-5.png' alt='About Us' className='img-fluid' />
                  <span>Experienced Masons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>



  );
};

export const getStaticPaths = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PRODUCT_CATEGORY_API_URL);
    const data = await res.json();

    const paths = data?.map((cat) => ({
      params: { AllCategory_slug: cat.slug },
    }));

    return {
      paths: paths || [],
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error generating paths:", error.message);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DETSILS_URL}/${params.AllCategory_slug}`);
    const data = await res.json();

    if (!data || !data.category || !data.products) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        category: data.category,
        products: data.products,
        faq: data.category.faqs || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Failed to load category details:", error.message);
    return {
      props: {
        category: null,
        products: [],
        faq: null,
        error: 'Something went wrong while loading this page.',
      },
      revalidate: 60,
    };
  }
};

export default CategoryPage;