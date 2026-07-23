import React, { useState, useRef } from "react";
import Head from "next/head";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import ModelBox from "@/components/ModelBox";
import Image from "next/image";

export const getStaticProps = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PRODUCT_CATEGORY_API_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await res.json();

    return {
      props: {
        categories,
        error: null, // No error if data is fetched successfully
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      props: {
        categories: [],
        error: "Failed to load categories. Please try again later.", // Set error message
      },
    };
  }
};
const getImageUrl = (img) =>
  img
    ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}`
    : "/img/webpages/product-01.jpg";

const Index = ({ categories }) => {
  /*accordian code*/
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const [showMore, setShowMore] = useState(false);

  const hiddenSectionRef = useRef(null);

  const handleToggle = () => {
    const nextState = !showMore;

    setShowMore(nextState);

    // Scroll with offset
    if (!showMore) {
      setTimeout(() => {
        const element = hiddenSectionRef.current;

        if (element) {
          const offset = 160; // adjust this value

          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;

          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };
  return (
    <>
      <Head>
        <title>Wholesale Memorial Stone for Graves UK | Stone Discover</title>
        <meta
          name="description"
          content="Wholesale memorial stones for graves across the UK. Trusted trade supplier offering quality granite memorial stones, custom designs & bulk pricing. Contact us today"
        />
        <link
          rel="canonical"
          href="https://www.stonediscover.co.uk/memorials/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Wholesale Memorial Stone for Graves UK | Stone Discover"
        />
        <meta
          property="og:description"
          content="Wholesale memorial stones for graves across the UK. Trusted trade supplier offering quality granite memorial stones, custom designs & bulk pricing. Contact us today"
        />
        <meta
          property="og:url"
          content="https://www.stonediscover.co.uk/memorials/"
        />
        <meta property="og:site_name" content="Stone Discover UK" />
        <meta
          property="og:image"
          content="https://www.stonediscover.co.uk/img/stone-og-inne.jpeg"
        />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Stone Discover UK" />
        <meta
          name="twitter:title"
          content="Wholesale Memorial Stone for Graves UK | Stone Discover"
        />
        <meta
          name="twitter:description"
          content="Wholesale memorial stones for graves across the UK. Trusted trade supplier offering quality granite memorial stones, custom designs & bulk pricing. Contact us today"
        />
        <meta
          name="twitter:image"
          content="https://www.stonediscover.co.uk/img/stone-og-inne.jpeg"
        />
      </Head>

      <div
        className="hero-banner-two"
        style={{
          backgroundImage: 'url("/img/banner/hero-banner-02.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-end">
              <div className="hero-banner-two-head ">
                <h1>
                  Memorial <span> Stones</span>
                </h1>
                <p>The UK’s Trusted Partner for Quality Memorial Stones</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-banner-two-image">
                <Image
                  src="/img/banner/single-page-001.png"
                  width={563}
                  height={563}
                  alt="single-page-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="p-b-80 p-t-40 m-p-06">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-left p-b-20">
                <h2 className="m-b-30">Our Categories</h2>
              </div>
            </div>
          </div>
          <div className="row g-3 sliding-row-05">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div className="col-lg-3 sliding-col-05" key={category.id}>
                  <div className="card-06">
                    <div className="card-06-item">
                      <a href={`/memorials/${category.slug}/`}>
                        <Image
                          src={getImageUrl(category.categoryicon)}
                          alt={category.name}
                          className="img-fluid"
                          width={300}
                          height={300}
                        />
                        <span>{category.title}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </div>
      </section>
      <section className="about-us-section p-t-40 p-b-40 m-p-05">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-us-content">
                <h2>About Memorial Stones</h2>
                <p>
                  Memorial stones are a permanent and dignified tribute to a
                  life lived. Crafted from premium-grade granite, they are built
                  to endure the UK's varied climate while maintaining their
                  beauty and inscription clarity for generations. At Stone
                  Discover UK, we supply the full range of granite memorial
                  stones — from traditional upright headstones and kerb sets to
                  bespoke sculptural pieces — all manufactured at our own
                  production facility in India and delivered directly to trade
                  buyers across the UK.
                </p>
                <p>
                  We work exclusively in the B2B space, supplying monumental
                  masons, funeral directors, memorial retailers, wholesale
                  distributors, and local cemetery authorities with
                  competitively priced, high-quality granite memorials.
                </p>
                <button className="btn btn-four m-t-30" onClick={handleToggle}>
                  {showMore ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-us-image">
                <img
                  src="/img/webpages/granite-memorial-headstones.png"
                  alt="granite memorial stones"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Section */}
      {showMore && (
        <section ref={hiddenSectionRef} className="p-t-40 p-b-40">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="about-full-content">
                  <p>
                    Memorial stones, also known as grave markers, tombstones, or
                    burial monuments, are permanent stone structures placed at
                    gravesites to commemorate the deceased. In the UK, memorial
                    stones are most commonly made from granite due to its
                    exceptional durability, weather resistance, and ability to
                    hold deep engravings for decades without fading.
                  </p>
                  <p>
                    Memorial stones come in a wide range of forms — upright
                    headstones, flat grave slabs, kerb sets that border the
                    grave plot, heart-shaped and angel-top memorials, children's
                    memorials, and cremation urns. Each piece can be customised
                    with inscriptions, motifs, portraits, and religious or
                    cultural symbols to reflect the individual being remembered.
                  </p>
                  <h3>Types of Memorial Stones We Supply</h3>
                  <p>
                    <b>
                      Stone Discover UK offers the following memorial stone
                      categories for trade buyers:
                    </b>
                  </p>
                  <ul>
                    <li>
                      Granite Headstones — Traditional upright memorials in
                      various profiles including Ogee, Pillow Top, Flat Top, and
                      Scroll. Available in standard and custom sizes.
                    </li>
                    <li>
                      Angel Headstones — Sculptural angel-top memorials
                      hand-carved from solid granite, popular across the UK
                      memorial trade.
                    </li>
                    <li>
                      Kerb Sets — Full grave surround sets with matching book
                      end, tablet, and kerb edging. Supplied as complete sets
                      for easy installation.
                    </li>
                    <li>
                      Children's Headstones — Smaller, thoughtfully designed
                      memorials crafted with care, available in animal, heart,
                      and book profiles.
                    </li>
                    <li>
                      Heart Headstones — A popular contemporary style for both
                      adult and infant memorials. Available in full and
                      half-heart designs.
                    </li>
                    <li>
                      Memorial Benches — Granite memorial benches for cemetery
                      placement or garden memorials. Engraving-ready with
                      customisable plaques.
                    </li>
                    <li>
                      Book Headstones — Open-book style memorial tablets,
                      suitable for both burial and cremation memorial gardens.
                      Memorial Plaques & Tablets — Wall-mounted or floor-set
                      granite plaques for columbarium walls, cremation gardens,
                      and mausoleum interiors.
                    </li>
                    <li>
                      Memorial Urns & Vases — Granite cremation urns and
                      memorial vases, designed for graveside placement and
                      indoor display.
                    </li>
                    <li>
                      Bespoke Memorials — Fully custom-designed pieces built to
                      your client's specifications. We handle complex shapes,
                      custom sculptures, and multi-piece installations.
                    </li>
                    <li>
                      Columbarium Units — Individual and multi-niche columbarium
                      structures for cremated remains, suitable for cemetery and
                      chapel installations.
                    </li>
                    <li>
                      Grave Markers — Flat granite grave markers for lawned
                      sections and municipal cemeteries. Cost-effective and
                      low-maintenance.
                    </li>
                  </ul>
                  <h3>Granite Materials We Use</h3>
                  <p>
                    All memorial stones supplied by Stone Discover UK are
                    manufactured using natural granite sourced from certified
                    quarries. Granite is the industry-preferred material for UK
                    memorials due to its hardness (rating 6–7 on the Mohs
                    scale), resistance to frost and rain, and its ability to
                    take a high-gloss polish.
                  </p>
                  <p>
                    <b>Our standard granite range includes:</b>
                  </p>
                  <ul>
                    <li>
                      Absolute Indian Black — The most popular choice for UK
                      memorials. Deep black, mirror-polished finish, clean
                      engraving contrast.
                    </li>
                    <li>
                      Bahama Blue — A distinctive dark blue-grey granite with
                      fine crystal texture. Popular for upright headstones.
                    </li>
                    <li>
                      Light Grey (Silver Cloud) — A lighter tone suited to more
                      traditional or contemporary memorial styles.
                    </li>
                    <li>
                      Indian Aurora (Multicolour) — Warm brown-red tones with
                      natural variation. Popular in certain regional UK markets.
                    </li>
                    <li>
                      Imperial Red — Rich red granite, often used for kerb sets
                      and accent pieces.
                    </li>
                    <li>
                      Blue Pearl (Imported) — Norwegian-origin granite with
                      iridescent blue shimmer. Available as an imported premium
                      option.
                    </li>
                    <li>
                      Olive Green — A distinctive dark green granite for buyers
                      seeking something non-standard.
                    </li>
                    <li>
                      South African Impala — Mid-grey with consistent grain,
                      well-regarded in the UK for its neutral finish.
                    </li>
                  </ul>
                  <p>
                    All finishes are available in polished, honed, or flamed as
                    required by specification.
                  </p>
                  <h3>Who We Supply</h3>
                  <p>
                    <b>
                      Stone Discover UK operates exclusively as a B2B wholesale
                      granite memorial supplier. Our trade clients include:
                    </b>
                  </p>
                  <ul>
                    <li>
                      Monumental Masons — We supply raw finished memorials ready
                      for lettering and installation, in both standard and
                      custom sizes.
                    </li>
                    <li>
                      Funeral Directors — We work with funeral homes offering
                      memorial products to bereaved families, providing trade
                      pricing and support.
                    </li>
                    <li>
                      Memorial Retailers & Showrooms — We supply stock ranges
                      and bespoke pieces for display and sale in UK memorial
                      showrooms.
                    </li>
                    <li>
                      Wholesale Distributors — Bulk supply arrangements with
                      flexible MOQs and direct-from-factory pricing.
                    </li>
                    <li>
                      Cemetery Authorities & Local Councils — We supply cemetery
                      furniture, grave markers, columbarium units, and
                      maintenance slabs.
                    </li>
                    <li>
                      Landscape & Garden Memorial Designers — Bespoke pieces for
                      private memorial gardens and public remembrance spaces.
                    </li>
                  </ul>
                  <p>
                    If your business purchases, sells, or installs granite
                    memorials in the UK, Stone Discover UK is your direct
                    manufacturing partner.
                  </p>
                  <h3>Our Production & Quality Process</h3>
                  <p>
                    <b>
                      Every memorial stone we supply is manufactured at our own
                      production facility in India — not sourced through
                      third-party suppliers. This gives us full control over
                      quality at every stage:
                    </b>
                  </p>
                  <ul>
                    <li>
                      Granite Sourcing — Blocks are selected directly from
                      certified quarries in India (Rajasthan, Andhra Pradesh,
                      Tamil Nadu).
                    </li>
                    <li>
                      Cutting & Shaping — CNC and wire-saw machinery ensures
                      dimensional accuracy to within ±2mm of specification.
                    </li>
                    <li>
                      Surface Finishing — Polishing, honing, or flaming is
                      applied per product specification.
                    </li>
                    <li>
                      Panel Preparation — All headstone panels are prepared to
                      be engraving-ready, with flat, smooth inscription
                      surfaces.
                    </li>
                    <li>
                      Quality Inspection — Every piece undergoes a multi-point
                      inspection before packing: surface, dimensions, finish,
                      and structural integrity.
                    </li>
                    <li>
                      Export Packing — Memorials are packed in wooden crates
                      with foam and edge protection to prevent transit damage.
                    </li>
                    <li>
                      UK Delivery — Distributed via our UK warehouse network
                      across Southampton, Liverpool, Birmingham, Manchester,
                      London, Edinburgh, Glasgow, and more.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="experience-section py-5 p-t-80 p-b-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="heading-center p-b-40">
                <h2 className="m-b-30">
                  How the Trade <span>Process Works</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {/* CARD 1 */}
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div
                className="experience-card position-relative text-center h-100"
                style={{ borderTop: "4px solid #2D9CDB" }}
              >
                <div className="step-number" style={{ background: "#2D9CDB" }}>
                  01
                </div>

                <div className="card-body-custom">
                  <div className="icon-wrapper mb-4">
                    <img
                      src="/img/webpages/stone-i-01.png"
                      alt="Enquiry"
                      className="img-fluid"
                    />
                  </div>

                  <h4 className="card-title-custom">Your Enquiry</h4>

                  <p className="card-desc">
                    Reach out to us with a picture, a hand drawn sketch or just
                    words that describe what you need!
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div
                className="experience-card position-relative text-center h-100"
                style={{ borderTop: "4px solid #EB5757" }}
              >
                <div className="step-number" style={{ background: "#EB5757" }}>
                  02
                </div>

                <div className="card-body-custom">
                  <div className="icon-wrapper mb-4">
                    <img
                      src="/img/webpages/stone-i-02.png"
                      alt="Quote"
                      className="img-fluid"
                    />
                  </div>

                  <h4 className="card-title-custom">We Quote</h4>

                  <p className="card-desc">
                    We will respond with prices within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div
                className="experience-card position-relative text-center h-100"
                style={{ borderTop: "4px solid #9B51E0" }}
              >
                <div className="step-number" style={{ background: "#9B51E0" }}>
                  03
                </div>

                <div className="card-body-custom">
                  <div className="icon-wrapper mb-4">
                    <img
                      src="/img/webpages/stone-i-03.png"
                      alt="CAD"
                      className="img-fluid"
                    />
                  </div>

                  <h4 className="card-title-custom">Drawing Submitted (CAD)</h4>

                  <p className="card-desc">
                    We offer detailed cad drawings upon order confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div
                className="experience-card position-relative text-center h-100"
                style={{ borderTop: "4px solid #27C2A5" }}
              >
                <div className="step-number" style={{ background: "#27C2A5" }}>
                  04
                </div>

                <div className="card-body-custom">
                  <div className="icon-wrapper mb-4">
                    <img
                      src="/img/webpages/stone-i-04.png"
                      alt="Material"
                      className="img-fluid"
                    />
                  </div>

                  <h4 className="card-title-custom">Block Image / Material</h4>

                  <p className="card-desc">
                    Upon request, a photo of the exact material will be sent for
                    review and approval.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 5 */}
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div
                className="experience-card position-relative text-center h-100"
                style={{ borderTop: "4px solid #F2994A" }}
              >
                <div className="step-number" style={{ background: "#F2994A" }}>
                  05
                </div>

                <div className="card-body-custom">
                  <div className="icon-wrapper mb-4">
                    <img
                      src="/img/webpages/stone-i-05.png"
                      alt="Finished"
                      className="img-fluid"
                    />
                  </div>

                  <h4 className="card-title-custom">
                    Finished Memorial Images
                  </h4>

                  <p className="card-desc">
                    Shall be sent to you from our production facility for your
                    approval prior to shipping.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 6 */}
            <div className="col-xl-2 col-lg-4 col-md-6">
              <div
                className="experience-card position-relative text-center h-100"
                style={{ borderTop: "4px solid #27AE60" }}
              >
                <div className="step-number" style={{ background: "#27AE60" }}>
                  06
                </div>

                <div className="card-body-custom">
                  <div className="icon-wrapper mb-4">
                    <img
                      src="/img/webpages/stone-i-06.png"
                      alt="Shipping"
                      className="img-fluid"
                    />
                  </div>

                  <h4 className="card-title-custom">Shipped To Your Works</h4>

                  <p className="card-desc">Safe delivery to your premises.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
