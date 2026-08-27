import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import ModelBox from "@/components/ModelBox";

export const getStaticProps = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_LOCATION);

    if (!res.ok) {
      throw new Error("Failed to fetch locations");
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

    const locations = Array.isArray(data)
      ? data.map((item) => ({
          ...item,
          id: item._id || item.slug,
          description: sanitizeHtml(item.description || "", sanitizeOptions),
        }))
      : [];

    return {
      props: {
        locations,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        locations: [],
      },
    };
  }
};

const Index = ({ locations = [] }) => {
  const [open, setOpen] = useState("1");
const [showFullDescription, setShowFullDescription] = useState(false);
  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const siteUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "") + "/";

  const canonicalUrl = `${siteUrl}location/`;

  const metaTitle = "UK Wholesale Granite Headstones Supplier | Stone Discover";

  const metaDescription =
    "Premium granite memorials for funeral homes, memorial dealers and trade buyers across the UK.";

  const metaImage = "https://www.stonediscover.co.uk/img/stone-og-inne.jpeg";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>

        <meta name="description" content={metaDescription} />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="website" />

        <meta property="og:title" content={metaTitle} />

        <meta property="og:description" content={metaDescription} />

        <meta property="og:url" content={canonicalUrl} />

        <meta property="og:image" content={metaImage} />

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content={metaTitle} />

        <meta name="twitter:description" content={metaDescription} />

        <meta name="twitter:image" content={metaImage} />

        {/* Dynamic Schema */}

        {locations?.map((location) =>
          location?.schemas?.map((schema) => (
            <script
              key={schema.id}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: schema.code,
              }}
            />
          )),
        )}
      </Head>

      {/* HERO */}

      <div className='common-header-banner' style={{textAlign:'left'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="hero-banner-two-head-cust">
                <h1> UK Wholesale Granite Headstones Supplier by Location</h1>
                <p>Stone Discover supplies premium granite headstones and memorials to funeral homes, memorial dealers and trade buyers across the UK. Find your local trade support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOCATIONS */}

      <section className="p-t-60 p-b-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-left p-b-30">
                <h2>Our Locations</h2>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {locations.length > 0 ? (
              [...locations]
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((location) => {
                  const image = location?.galleries?.[0]?.images?.[0];

                  return (
                    <div className="col-lg-3 col-md-6" key={location.id}>
                      <div className="card-06 h-100">
                        <div className="card-06-item card-06-item-00 h-100">
                          <Link href={`/location/${location.slug}/`}>
                            <div className="overflow-hidden rounded-3">
                              <Image
                                src={
                                  image
                                    ? `${process.env.NEXT_PUBLIC_IMAGE}/${image}`
                                    : "/img/webpages/product-01.jpg"
                                }
                                alt={location.title}
                                className="img-fluid w-100"
                                width={400}
                                height={300}
                              />
                            </div>

                            <div className="p-3">
                              <h3>{location.title}</h3>

                              {/* <p>{location.shortdescription?.slice(0, 90)}</p> */}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="col-lg-12">
                <p>No locations found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

       
       {/* =========================================================
    LOCATION ABOUT SECTION
========================================================= */}
<section className="location-about-block p-t-80 p-b-40">
  <div className="container">
    <div className="row align-items-center">

      {/* CONTENT */}
      <div className="col-lg-6">
        <div className="location-about-info">

          <h2>About UK Wholesale Granite Headstones</h2>

          <p>
            Stone Discover UK supplies premium granite headstones, memorial
            benches and cremation memorials to funeral homes, memorial masons
            and trade buyers throughout the United Kingdom.
          </p>

          <p>
            As a direct manufacturer, we offer wholesale pricing, trade
            accounts and reliable delivery from our UK stock held in Liverpool.
          </p>

          <p>
            We support memorial businesses across major UK locations, including
            London, Birmingham, Manchester, Liverpool, Southampton, Edinburgh,
            Glasgow and Leeds.
          </p>

          <button
            type="button"
            className="location-read-more-btn"
            onClick={() => {
              setShowFullDescription(true);

              setTimeout(() => {
                document
                  .getElementById("location-full-details")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }, 100);
            }}
          >
            Read More
          </button>

        </div>
      </div>

      {/* IMAGE */}
      <div className="col-lg-6">
        <div className="location-about-media">
          <Image
            src="/img/webpages/granite-memorial-headstones.png"
            alt="UK Wholesale Granite Headstones"
            width={553}
            height={545}
            className="img-fluid"
            priority
          />
        </div>
      </div>

    </div>
  </div>
</section>


{/* =========================================================
    LOCATION FULL DETAILS
========================================================= */}
{showFullDescription && (
  <section
    id="location-full-details"
    className="location-details-block p-t-60 p-b-60"
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-12">

          <div className="location-details-info">

            <h2>UK Wholesale Granite Headstones Supplier by Location</h2>

            <p>
              Stone Discover UK supplies premium granite headstones, memorial
              benches and cremation memorials to funeral homes, memorial masons
              and trade buyers throughout the United Kingdom. As a direct
              manufacturer, we work with dealers across England and Scotland,
              offering wholesale pricing, trade accounts and reliable delivery
              from our UK stock held in Liverpool.
            </p>

            <p>
              Whether you are a memorial retailer in{" "}
              <a href="/location/london/">London</a> sourcing bespoke upright
              headstones, a funeral director in{" "}
              <a href="/location/manchester/">Manchester</a> expanding your
              memorial catalogue, or a stonemason in{" "}
              <a href="/location/edinburgh/">Edinburgh</a> managing custom
              orders for local cemeteries, our team understands that cemetery
              authority requirements, stone preferences and delivery timelines
              vary by region, and we support each account accordingly.
            </p>

            <p>
              We currently serve trade buyers across eight major UK cities:{" "}
              <a href="/location/london/">London</a>,{" "}
              <a href="/location/birmingham/">Birmingham</a>,{" "}
              <a href="/location/manchester/">Manchester</a>,{" "}
              <a href="/location/liverpool/">Liverpool</a>,{" "}
              <a href="/location/southampton/">Southampton</a>,{" "}
              <a href="/location/edinburgh/">Edinburgh</a>,{" "}
              <a href="/location/glasgow/">Glasgow</a> and{" "}
              <a href="/location/leeds/">Leeds</a>, with nationwide shipping
              available beyond these hubs.
            </p>

            <p>
              All memorials are manufactured in India using premium granite
              including Bahama Blue, Indian Aurora and Jet Black, finished to
              BS 8415:2018 and NAMM compliance standards. From bespoke designs
              to bulk trade orders, we support memorial businesses with
              consistent quality, competitive pricing and dependable UK-wide
              delivery.
            </p>

            <p>
              Browse your nearest location below, view our full{" "}
              <a href="/memorials/">memorial stone range</a>, or{" "}
              <a href="/get-quote-now/">request a trade quote</a> to get
              started.
            </p>

            <button
              type="button"
              className="location-read-less-btn"
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

    </>
  );
};

export default Index;
