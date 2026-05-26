import React, { useState, useRef } from 'react';
import Head from 'next/head';
import ModelBox from '@/components/ModelBox';
import Image from 'next/image';
export default function Home() {




  return (
    <>
      <Head>
        <title>Wholesale Memorial Headstones in the UK | Stone Discover UK</title>
        <meta
          name="description"
          content="Buy high-quality memorial headstones at wholesale prices in the UK. Ideal for funeral homes, stone retailers, and fabricators. Contact Stone Discover UK today."
        />
        <link rel="canonical" href="https://www.stonediscover.co.uk/" />
        <meta property="og:locale" content="UK" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wholesale Memorial Headstones in the UK | Stone Discover UK" />
        <meta property="og:description" content="Buy high-quality memorial headstones at wholesale prices in the UK. Ideal for funeral homes, stone retailers, and fabricators. Contact Stone Discover UK today." />
        <meta property="og:url" content="https://www.stonediscover.co.uk/" />
        <meta property="og:site_name" content="Stone Discover UK" />
        <meta property="og:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Stone Discover UK" />
        <meta name="twitter:title" content="Wholesale Memorial Headstones in the UK | Stone Discover UK" />
        <meta name="twitter:description" content="Buy high-quality memorial headstones at wholesale prices in the UK. Ideal for funeral homes, stone retailers, and fabricators. Contact Stone Discover UK today." />
        <meta name="twitter:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.stonediscover.co.uk/#organization",
                  "name": "Stone Discover UK Ltd.",
                  "url": "https://www.stonediscover.co.uk/",
                  "foundingDate": "1984",
                  "sameAs": [
                    "https://x.com/sdiscover_uk",
                    "https://www.linkedin.com/company/stone-discover-uk-ltd/"
                  ],
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://www.stonediscover.co.uk/#logo",
                    "inLanguage": "en-GB",
                    "url": "https://www.stonediscover.co.uk/stone-logo.png",
                    "contentUrl": "https://www.stonediscover.co.uk/stone-logo.png",
                    "width": 1024,
                    "height": 1024,
                    "caption": "Stone Discover UK"
                  },
                  "image": { "@id": "https://www.stonediscover.co.uk/#logo" },
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct from our quarry in India. UK stock in Liverpool and Southampton.",
                  "alternateName": "Stone Discover Wholesale Memorial Headstones Supplier UK",
                  "telephone": ["+44 7481 959 052", "+44 161 394 1594"],
                  "email": "info@stonediscover.co.uk",
                  "brand": {
                    "@type": "Brand",
                    "name": "Stone Discover UK Ltd.",
                    "logo": "https://www.stonediscover.co.uk/stone-logo.png"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.stonediscover.co.uk/#website",
                  "url": "https://www.stonediscover.co.uk/",
                  "name": "Stone Discover UK Ltd.",
                  "alternateName": "Stone Discover — Wholesale Granite Memorials Supplier UK",
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct since 1984. UK warehouse stock in Liverpool and Southampton.",
                  "publisher": { "@id": "https://www.stonediscover.co.uk/#organization" },
                  "potentialAction": [{
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.stonediscover.co.uk/?s={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }],
                  "inLanguage": "en-GB"
                },
                {
                  "@type": "WebPage",
                  "@id": "https://www.stonediscover.co.uk/#webpage",
                  "url": "https://www.stonediscover.co.uk/",
                  "name": "Wholesale Memorial Headstones UK | Stone Discover UK",
                  "isPartOf": { "@id": "https://www.stonediscover.co.uk/#website" },
                  "about": { "@id": "https://www.stonediscover.co.uk/#organization" },
                  "primaryImageOfPage": { "@id": "https://www.stonediscover.co.uk/#logo" },
                  "datePublished": "2024-01-01T00:00:00+00:00",
                  "dateModified": "2025-05-26T00:00:00+00:00",
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct since 1984. UK warehouse stock in Liverpool and Southampton.",
                  "inLanguage": "en-GB",
                  "potentialAction": [{
                    "@type": "ReadAction",
                    "target": ["https://www.stonediscover.co.uk/"]
                  }],
                  "headline": "UK's Wholesale Memorial Headstones Supplier",
                  "keywords": [
                    "wholesale memorial headstones UK",
                    "granite memorial UK",
                    "memorial supplier UK",
                    "memorial headstones UK",
                    "wholesale granite headstones",
                    "granite grave markers UK",
                    "trade memorial supplier UK"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.stonediscover.co.uk/#localbusiness",
                  "name": "Stone Discover UK Ltd.",
                  "description": "Wholesale granite memorial headstones for UK stonemasons, funeral directors and monument dealers. Factory direct since 1984. UK warehouse stock in Liverpool and Southampton.",
                  "image": "https://www.stonediscover.co.uk/stone-logo.png",
                  "alternateName": "Stone Discover Wholesale Memorial Supplier UK",
                  "priceRange": "££",
                  "telephone": ["+44 7481 959 052", "+44 161 394 1594"],
                  "email": "info@stonediscover.co.uk",
                  "url": "https://www.stonediscover.co.uk/",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "124-128 City Road",
                    "addressLocality": "London",
                    "addressRegion": "England",
                    "postalCode": "EC1V 2NX",
                    "addressCountry": "GB"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 51.52706865727293,
                    "longitude": -0.08876773400079006
                  },
                  "brand": {
                    "@type": "Brand",
                    "name": "Stone Discover UK Ltd.",
                    "logo": "https://www.stonediscover.co.uk/stone-logo.png"
                  },
                  "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "08:00",
                    "closes": "17:00"
                  }],
                  "sameAs": [
                    "https://x.com/sdiscover_uk",
                    "https://www.linkedin.com/company/stone-discover-uk-ltd/"
                  ]
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.stonediscover.co.uk/#faqpage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What types of memorials do you provide?",
                      "acceptedAnswer": { "@type": "Answer", "text": "We offer Ogee Memorials, Angel Memorials, Bench Memorials, Children Memorials, Heart shaped memorials, Kerb sets, Cremation Urns, and Vases. All products are made from premium Indian granite in different colours and finishes." }
                    },
                    {
                      "@type": "Question",
                      "name": "Who can buy from Stone Discover UK?",
                      "acceptedAnswer": { "@type": "Answer", "text": "We supply memorial headstones wholesale to stonemasons, funeral directors, monument dealers, wholesalers and importers. We supply bulk orders at competitive trade prices across the UK." }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the minimum order quantity for granite headstones?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Free delivery is included on a minimum order of 5 sets of Ogees, Mapples, or Kerbsets to a single UK address. Contact us for a detailed quote on your specific requirements." }
                    },
                    {
                      "@type": "Question",
                      "name": "Do you supply NAMM-compliant headstones?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our memorial stones are manufactured to meet UK memorial trade standards including BS 8415. We provide full compliance documentation covering size, weight, and fixing specifications for cemetery authority submission." }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the lead time for wholesale headstone orders?",
                      "acceptedAnswer": { "@type": "Answer", "text": "UK-stocked standard designs dispatch within 3-5 working days from our Liverpool or Southampton warehouse. Custom and bespoke manufactured orders take 6-8 weeks (standard) or 8-10 weeks (complex bespoke)." }
                    },
                    {
                      "@type": "Question",
                      "name": "Where are your headstones manufactured?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Our headstones are crafted at our own manufacturing facility in Chennai, India, using granite from our quarry in Khammam, Telangana. We have supplied granite memorials since 1984. Stock is held at our UK warehouses in Liverpool and Southampton for fast trade dispatch." }
                    },
                    {
                      "@type": "Question",
                      "name": "Can headstones be customised for trade orders?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Full customisation is available including sizes, shapes, granite colours, engravings, finishes, and carved details. We support bespoke designs for all headstone types." }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I order granite samples before placing a bulk order?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Yes. Granite sample pieces and a physical trade catalogue are available for verified trade buyers. Contact our sales team on +44 7481 959 052 or info@stonediscover.co.uk to arrange samples." }
                    },
                    {
                      "@type": "Question",
                      "name": "What granite colours are available for UK headstones?",
                      "acceptedAnswer": { "@type": "Answer", "text": "We supply 40+ granite colours. Most popular for UK cemeteries: Absolute Black, Steel Grey, Bahama Blue, Imperial Red, Indian Aurora, Viscon White, and Indian Juparana. Premium imported colours including Black Pearl, Blue Pearl, and South African Impala are also available." }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </Head>

      <div className="hero-banner-one">
        <Image
          src="/img/banner/hero-banner-three.png"
          alt="Hero Banner"
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
          className='desh-top'
        />
        <Image
          src="/img/banner/mobile-bg.png"
          alt="Hero Banner"
          fill
          className='mobile-top'
          style={{ objectFit: 'cover', objectPosition: 'center bottom' }}
          priority
        />

        {/* Content over the image */}
        <div className="relative z-10">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-9 text-center">
                <div className="hero-banner-content">
                  <h1>UK's Trusted Wholesale Memorial Headstones Supplier</h1>
                  <p>
                    We specialize in creating premium quality memorial headstones and gravestones using the finest granite
                  </p>
                  <div className="hero-banner-btn">
                    <ModelBox className="btn-three" headerText="Scale Your Store!" buttonText="Get Quote Now" />
                    {/* <ModelBox className="btn-transparent" headerText="Scale Your Store!" buttonText="Request Catalogue" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='quote-us-section'>
        <div className='container'>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-12 text-center'>
              <div className='quote-us-content'>
                <p>We proudly serve dealers and wholesalers across the UK, offering memorial stones in bulk quantities that are carefully designed and produced in our industries to meet the highest quality standards for the customers.</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='about-us-section p-b-40'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='about-us-content'>
                <h2>About Us</h2>
                <p>Stone Discover UK is a trusted name in the memorial industry, dedicated to supplying memorial stones all over the United Kingdom. Whether you are looking for an Ogee, Kerb set, Heart-shaped, or Angel memorial, we have a wide range of memorials to suit all kinds of needs.</p>

                <p>Our skilled professionals ensure that each piece is thoughtfully designed and crafted with care and precision, reflecting the memory of the deceased. We also do custom designs by adding memorial flower vases and graveside ornaments to add a personal touch to the memorial.</p>
                <p>With warehouses in Liverpool and Southampton, we ensure safe packaging and prompt delivery. Please feel free to visit our showrooms for any queries or further guidance.</p>
                <a href='/about-us/' className='btn btn-four m-t-30' >Read More<span className="sr-only">about Stone Discover</span></a>
              </div>
            </div>

            <div className='col-lg-6'>
              <div className='about-us-image'>
                <Image src='/img/webpages/about-us-pic.png' alt='About Us' className='img-fluid' width={553} height={545} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='p-t-40 p-b-40 m-p-30'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/add-location-alt.png' alt='Our Location' className='img-fluid' width={48} height={49} />
                <h3>UK Presence</h3>
                <p>We are a wholesale memorial headstones supplier expanding across the UK, with warehouses in Liverpool and Southampton. This allows us to keep stock ready for fast delivery to trade customers nationwide.</p>
              </div>
            </div>
            <div className='col-lg-4 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/delivery-truck-speed.png' alt='Seamless Delivery' className='img-fluid' width={48} height={49} />
                <h3>Quick Turnaround</h3>
                <p>Standard catalogue memorials are stocked in our UK warehouses for quick dispatch. For bespoke orders, production is managed by our parent company, Stone Discover, ensuring reliable lead times and consistent quality.</p>
              </div>
            </div>
            <div className='col-lg-4 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/handyman.png' alt='Timeless Craftsmanship' className='img-fluid' width={48} height={49} />
                <h3>Timeless Craftsmanship</h3>
                <p>All memorial headstones are crafted in India by skilled craftsmen using premium granite, delivering durable and high-quality products for the UK trade market.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='products-section-one m-p-02'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-20'>Any <span> Design</span>, Size, Color</h2>

              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='card-02'>
                <div className='card-02-item'>
                  <a href="/memorials/book-headstones/">
                    <Image src='/img/webpages/pic-01.png' alt='Balck Granite Book Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Book Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/heart-headstones/">
                    <Image src='/img/webpages/pic-02.png' alt='Balck Granite Heart Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Heart Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/headstones/">
                    <Image src='/img/webpages/pic-03.png' alt='Balck Granite Headstones' className='img-fluid' width={256} height={471} />
                    <h3>Headstones</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/angel-headstone/">
                    <Image src='/img/webpages/pic-04.png' alt='Balck Granite Angel Headstone' className='img-fluid' width={256} height={471} />
                    <h3>Angel Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/vases/">
                    <Image src='/img/webpages/pic-05.png' alt='Balck Granite Vases' className='img-fluid' width={256} height={471} />
                    <h3>Vases</h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='content-section-two p-b-80 p-t-100 m-p-03'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 align-items-center'>
              <div className='left-card-01-img'>
                <Image src='/img/webpages/pic-06.png' alt='memorial headstones' className='img-fluid' width={553} height={545} />
              </div>
            </div>
            <div className='col-lg-6 d-flex'>

              <div className='card-03'>
                <ul>
                  <li className='m-b-20'>
                    <h3 className='m-b-20'>Memorial Wholesaler</h3>
                    <p>We supply memorials to monument suppliers, wholesalers, and fabricators throughout the UK. As the largest stockist of granite headstones in the country, we are known for our reliable delivery service and exceptional quality.</p>
                  </li>
                  <li className='m-b-20'>
                    <h3 className='m-b-20'>Premium Granite Colors</h3>
                    <p>We offer a variety of premium granite colors, including Absolute Indian Black, Bahama Blue, Indian Aurora, Indian Impala, Imperial Red, Light Grey Granite, and many more. Imported varieties such as Black Pearl, Olive Green, and South African Impala are also available for bespoke designs.</p>
                  </li>
                  <li>
                    <h3 className='m-b-20'>Bespoke Designs</h3>
                    <p>We are able to produce monuments of any custom dimensions, finishes, and engraving options to meet your local market needs. We can also replicate the design in a variety of granite colors depending on availability and preference.</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </section>

      <section className='p-b-100 m-p-04'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Memorial Collection <span>Crafted</span> for All</h2>
                <p>We offer a wide range of expertly crafted memorial designs to suit every need and occasion. From classic headstones and kerbsets to elegant bench and heart memorials, our collection also includes vases, urns, angel tributes, and dedicated children’s memorials. Each piece is made with care, precision, and a deep respect for the memories it honors. Contact us directly for competitive quotes and tailored solutions.</p>
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

      {/* <section className='p-t-80'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Join Hands with a Reliable <span>Tombstone Supplier</span></h2>
                <p>Whether you’re a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
              </div>
              <div className='button-center-new text-center'>
                <a href='/' className='btn btn-three'>Request a Quote</a>
                <a href='/' className='btn btn-four'>Request Catalogue</a>

              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className='p-b-30'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Why Choose Us?</h2>
                <p>Whether you’re a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
              </div>

            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12'>
              <div className='card-05'>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-1.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Quality Craftmanship</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-2.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Nationwide Delivery</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-3.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>24*7 Customer Service</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-4.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Custom Designs</span>
                </div>
                <div className='card-05-item'>
                  <Image src='/img/icons/icons-5.png' alt='About Us' className='img-fluid' width={58} height={76} />
                  <span>Experienced Masons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className='faq'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Frequently Asked <span>Questions</span></h2>
              </div>

            </div>
          </div>
        </div>
      </section> */}

      <section className='p-b-60 p-t-80 m-p-04'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Our Top Selling <span>Granite</span> Headstones </h2>
              </div>
            </div>
          </div>
          <div className='row g-2 sliding-row'>
            <div className='col-lg-3 col-md-6 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/stocks-available/">
                    <img src='/img/webpages/black-anton-headstone.png' alt='Black Anton Headstone' className='img-fluid' />
                    <h4>Black Anton Headstone</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/stocks-available/">
                    <img src='/img/webpages/black-celtic-cross-headstone.png' alt='Black Celtic Cross Headstone' className='img-fluid' />
                    <h4>Black Celtic Cross Headstone</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/stocks-available/">
                    <img src='/img/webpages/black-ogee-headstone.png' alt='Black Ogee Headstone' className='img-fluid' />
                    <h4>Black Ogee Headstone</h4>
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/stocks-available/">
                    <img src='/img/webpages/Black-Ogee-with-rope-moulding-headstone.png' alt='Black Ogee With Rope Moulding Headstone' className='img-fluid' />
                    <h4>Black Ogee With Rope Moulding Headstone</h4>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



    </>
  );
}
