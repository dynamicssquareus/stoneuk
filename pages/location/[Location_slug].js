import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

import sanitizeHtml from "sanitize-html";
import ModelBox from "@/components/ModelBox";
import FooterContactFormHome from "@/components/FooterContactFormHome";


const getImageUrl = (img) =>
  img
    ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}`
    : "/img/webpages/product-01.jpg";

export async function getStaticPaths() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_LOCATION);

    const locations = await res.json();

    const paths = locations.map((item) => ({
      params: {
        Location_slug: item.slug,
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LOCATION_DETAILS}/${params.Location_slug}`,
    );

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const data = await res.json();

    const sanitizeOptions = {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h2",
        "h3",
        "br",
        "blockquote",
        "ul",
        "li",
        "strong",
      ]),
      allowedAttributes: {
        a: ["href", "target", "rel"],
        img: ["src", "alt"],
        "*": ["class"],
      },
    };

    const location = {
      ...data,
      description: sanitizeHtml(data.description || "", sanitizeOptions),
    };

    return {
      props: {
        location,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const LocationPage = ({ location }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [open, setOpen] = useState("1");

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}location/${location.slug}/`;

  const metaTitle = location.metaTitle || location.title;

  const metaDescription = location.metaDescription || location.shortdescription;

  const heroImage = location.banner || location?.galleries?.[0]?.images?.[0];

  return (
    <>
      <Head>
        <title>{metaTitle}</title>

        <meta name="description" content={metaDescription} />

        <meta name="keywords" content={location.metaKeywords || ""} />

        <link rel="canonical" href={canonicalUrl} />

        {/* OPEN GRAPH */}

        <meta property="og:type" content="website" />

        <meta property="og:title" content={metaTitle} />

        <meta property="og:description" content={metaDescription} />

        <meta property="og:url" content={canonicalUrl} />

        <meta property="og:site_name" content="Stone Discover UK" />

        <meta property="og:image" content={getImageUrl(heroImage)} />

        {/* TWITTER */}

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content={metaTitle} />

        <meta name="twitter:description" content={metaDescription} />

        <meta name="twitter:image" content={getImageUrl(heroImage)} />

        {/* SCHEMA */}

        {location?.schemas?.map((schema) => (
          <script
            key={schema.id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: schema.code,
            }}
          />
        ))}
      </Head>

      {/* HERO */}

      <div className='common-header-banner' style={{textAlign:'left'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='commn-head'>
                                <h1>{location.title}</h1>
                                <p>{location.shortdescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

      {location?.products?.length > 0 && (
        <section className="p-t-40 p-b-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading-left p-b-30">
                  <h2>Our Products</h2>
                </div>
              </div>
            </div>

            <div className="row g-3 sliding-row-05">
              {location.products.map((product) => (
                <div className="col-lg-3 sliding-col-05" key={product._id}>
                  <div className="card-06">
                    <div className="card-06-item">
                      <a href={`/product/${product.slug}`}>
                        <Image
                          src={getImageUrl(product.images?.[0])}
                          alt={product.title}
                          className="img-fluid"
                          width={300}
                          height={200}
                        />
                        <span>{product.title}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="about-us-section p-t-80 p-b-40">
  <div className="container">
    <div className="row align-items-center">

      {/* ABOUT CONTENT */}
      <div className="col-lg-6">
        <div className="about-us-content">

          <h2>About {location.title}</h2>

          {location.description ? (
            <>
              <div
                className="description-short"
                dangerouslySetInnerHTML={{
                  __html: location.description,
                }}
              />

              <button
                type="button"
                className="btn btn-four m-t-30"
                onClick={() => {
                  setShowFullDescription(true);

                  setTimeout(() => {
                    document
                      .getElementById("full-description")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }, 100);
                }}
              >
                Read More
              </button>
            </>
          ) : null}

        </div>
      </div>

      {/* ABOUT IMAGE */}
      <div className="col-lg-6">
        <div className="about-us-image">
          <Image
            src={getImageUrl(heroImage)}
            alt={location.title}
            width={500}
            height={500}
            className="img-fluid"
            priority
          />
        </div>
      </div>

    </div>
  </div>
</section>


{/* =========================================================
    FULL DESCRIPTION - SEPARATE SECTION
========================================================= */}
{showFullDescription && location.description && (
  <section
    id="full-description"
    className="full-description-section p-t-40 p-b-60"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12">

          <div className="full-description-content">

            <h2>More About {location.title}</h2>

            <div
              dangerouslySetInnerHTML={{
                __html: location.description,
              }}
            />

            <button
              type="button"
              className="btn btn-four m-t-30"
              onClick={() => {
                setShowFullDescription(false);

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Read Less
            </button>

          </div>

        </div>
      </div>
    </div>
  </section>
)}
            

       {/* WHY PARTNER */}

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
                <img
                  src="/img/webpages/headstones-pic.png"
                  alt="granite memorial stones"
                />
              </div>
            </div>
            <div className="col-lg-6 align-self-center">
              <div className="form-left">
                <div className="accordion-one accordion-one-product">
                  <Accordion open={open} toggle={toggle}>
                    <AccordionItem>
                      <AccordionHeader targetId="1">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3>
                            <img
                              src="/img/icons/faq-icon-01.png"
                              alt="faq-icon"
                            />
                            Direct Manufacturer Advantage
                          </h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                                                     {open === '1' ? '-' : '+'}
                                                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="1">
                        <p>
                          We own and operate our production facilities in India
                          — no middlemen, no markups, just direct supply to your
                          business.
                        </p>
                        <p>
                          <b>What this means for you:</b>
                        </p>
                        <ul>
                          <li>
                            Competitive B2B wholesale pricing on every order
                          </li>
                          <li>
                            Flexible customisation on shapes, sizes, and
                            finishes
                          </li>
                          <li>
                            Faster production turnaround and smooth logistics
                          </li>
                          <li>
                            Full control over quality from quarry to dispatch
                          </li>
                        </ul>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="2">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3>
                            <img
                              src="/img/icons/faq-icon-02.png"
                              alt="faq-icon"
                            />
                            Consistent Quality, Every Time
                          </h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                                                     {open === '1' ? '-' : '+'}
                                                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="2">
                        <p>
                          Every piece that leaves our facility is built to last
                          — and built to impress. Our memorials are crafted from
                          premium-grade Indian granite, renowned worldwide for
                          its density, weather resistance, and timeless finish.
                          Each product goes through a multi-stage quality check
                          covering:
                        </p>
                        <ul>
                          <li>Surface finishing and polish consistency</li>
                          <li>Dimensional accuracy to your specifications</li>
                          <li>Structural integrity for outdoor durability</li>
                          <li>Engraving-ready panel preparation</li>
                        </ul>
                        <p>
                          When your customers receive a Stone Discover product,
                          it reflects the standard your business stands for.
                        </p>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="3">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3>
                            <img
                              src="/img/icons/faq-icon-03.png"
                              alt="faq-icon"
                            />
                            Bespoke Designs
                          </h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                                                     {open === '1' ? '-' : '+'}
                                                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="3">
                        <p>
                          Your customers have unique needs. We make sure you can
                          meet every one of them.
                        </p>
                        <p>
                          <b>
                            We support full customisation across our entire
                            product range, including:
                          </b>
                        </p>
                        <ul>
                          <li>Headstones (upright, flat, kerb sets)</li>
                          <li>Kerbsets</li>
                          <li>Vases and Urns</li>
                          <li>Angel Memorials</li>
                          <li>Children Memorials</li>
                          <li>Heart Headstones</li>
                          <li>Memorial Benches</li>
                        </ul>
                        <p>
                          All designs come engraving-ready, and we welcome
                          custom shapes, sizes, granite colours, and sculpted
                          details. Whether you need a one-off bespoke piece or a
                          bulk order in a specific style — we deliver.
                        </p>
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="4">
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <h3>
                            <img
                              src="/img/icons/faq-icon-04.png"
                              alt="faq-icon"
                            />
                            Seamless Logistics & Delivery
                          </h3>
                          {/* <span className={`icon ${open === '1' ? 'open' : 'closed'}`}>
                                                                                                                     {open === '1' ? '-' : '+'}
                                                                                                                 </span> */}
                        </div>
                      </AccordionHeader>
                      <AccordionBody accordionId="4">
                        <p>
                          From our production floor to your door — reliable,
                          trackable, and hassle-free. Stone Discover UK supplies
                          granite memorials across the entire UK with warehouse
                          distribution from:
                        </p>
                        <p>
                          <b>
                            Southampton · Liverpool · Birmingham · Blackpool ·
                            Manchester · Wales · London · Edinburgh · Glasgow ·
                            Aberdeen · Scotland
                          </b>
                        </p>
                        <p>We guarantee:</p>
                        <ul>
                          <li>On-time delivery to your location</li>
                          <li>
                            Proper transport coordination for fragile stone
                            products
                          </li>
                          <li>
                            Hassle-free customs handling (for international
                            orders)
                          </li>
                          <li>Bulk order dispatch with flexible lead times</li>
                        </ul>
                        <p>
                          Whether you're a memorial mason, retail monument
                          supplier, or wholesale distributor — our logistics
                          network is built to keep your business moving.
                        </p>
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
                <div className="card-05-item">
                  <img
                    src="/img/icons/icons-1.png"
                    alt="About Us"
                    className="img-fluid"
                  />
                  <span>Quality Craftmanship</span>
                </div>
                <div className="card-05-item">
                  <img
                    src="/img/icons/icons-2.png"
                    alt="About Us"
                    className="img-fluid"
                  />
                  <span>Nationwide Delivery</span>
                </div>
                <div className="card-05-item">
                  <img
                    src="/img/icons/icons-3.png"
                    alt="About Us"
                    className="img-fluid"
                  />
                  <span>24*7 Customer Service</span>
                </div>
                <div className="card-05-item">
                  <img
                    src="/img/icons/icons-4.png"
                    alt="About Us"
                    className="img-fluid"
                  />
                  <span>Custom Designs</span>
                </div>
                <div className="card-05-item">
                  <img
                    src="/img/icons/icons-5.png"
                    alt="About Us"
                    className="img-fluid"
                  />
                  <span>Experienced Masons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-t-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="heading-center p-b-40">
                <h2 className="m-b-30">
                  Join Hands with a Reliable <span>Memorial Supplier</span>
                </h2>
                <p>
                  Whether you’re a high-volume buyer or expanding your product
                  line, our team is here to support your growth. We understand
                  the B2B dynamics of the memorial industry and deliver not just
                  products—but trust, consistency, and partnership.
                </p>
              </div>
              <div className="button-center-new text-center">
                <ModelBox
                  className="btn-three"
                  headerText="Scale Your Store! "
                  buttonText="Request a Quote"
                />
                <a className="btn-four btn-four-cc" href="/catalog-download">
                  Request Catalogue
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      {location?.faqs?.length > 0 && (
        <FooterContactFormHome
          faqList={location.faqs.filter((faq) => faq.question && faq.answer)}
        />
      )}
    </>
  );
};

export default LocationPage;
