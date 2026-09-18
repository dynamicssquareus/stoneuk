import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ModelBox from '@/components/ModelBox';
import Image from 'next/image';
export default function Home({ latestBlogs = [] }) {

  const buildImageUrl = (baseUrl, img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return `${baseUrl.replace(/\/$/, '')}/${img.replace(/^\//, '')}`;
  };

  const getImageUrl = (img) =>
    buildImageUrl(process.env.NEXT_PUBLIC_BLOG_API_Image, img);

  const getProfileImageUrl = (img) =>
    buildImageUrl(process.env.NEXT_PUBLIC_BLOG_API_Image_profilePics, img);




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
      </Head>

      <div className="hero-banner-one">
        <Image
          src="/img/banner/hero-banner-three.png"
          alt="Memorial HeadStone"
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          priority
          className='desh-top'
        />
        <Image
          src="/img/banner/mobile-bg.png"
          alt="Memorial HeadStone"
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
                  <p>We specialise in creating premium quality memorial headstones and gravestones using the finest granite, supplying trade buyers across the United Kingdom for over 40 years.</p>
                  <div className="hero-banner-btn">
                    <ModelBox className="btn-three" headerText="Scale Your Store!" buttonText="Get Quote Now" />
                    <a href="/stocks-available/" className="btn btn-four hero-btn">In Stock<span className="sr-only">In Stock</span></a>
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
                <p>We proudly serve dealers and wholesalers across the UK, offering memorial headstones in bulk quantities that are carefully designed and produced in our industries to meet the highest quality standards for the customers.</p>

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
                <h2>About Stone Discover UK</h2>
                <p>Stone Discover UK is a trusted name in the memorial industry, dedicated to supplying <a href="/memorials/">memorial stones</a> all over the United Kingdom. Whether you are looking for an Ogee, kerb set, heart-shaped, or angel memorial, we have a wide range of designs to suit all kinds of requirements — from single trade orders to high-volume bulk supply.</p>

                <p>We are the UK trade arm of Stone Discover, our parent manufacturing company based in India, which gives us direct control over production quality, lead times and pricing rather than relying on third-party manufacturers. Our skilled craftsmen, many with 40+ years' experience in granite masonry, source raw granite from trusted quarries and cut, engrave and finish each memorial using a combination of traditional hand-finishing and modern precision machinery. Every piece is thoughtfully designed and crafted with care, reflecting the memory of the person it honours.</p>
                <p>Beyond standard catalogue designs, we produce fully custom memorials, adding flower vases, graveside ornaments, bespoke engraving and non-standard dimensions to meet local market or cemetery authority requirements.
                </p>
                <p>With warehouses in Liverpool, London and Southampton, we hold stock of our most popular catalogue designs for fast dispatch, while bespoke and made-to-order pieces are manufactured to your specification and shipped directly. We ensure safe packaging and prompt, trackable delivery on every order. Trade customers are welcome to visit our showrooms for guidance on granite colours, finishes and design options before committing to an order.</p>
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
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Why Trade Buyers Choose <span>Stone Discover UK</span></h2>
                <p>Whether you're a high-volume buyer or expanding your product line, our team understands the B2B dynamics of the memorial industry and delivers not just products, but trust, consistency and long-term partnership.</p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/add-location-alt.png' alt='Our Location' className='img-fluid' width={48} height={49} />
                <h3>UK Warehousing & Fast Dispatch</h3>
                <p>Stock held across Liverpool, London and Southampton, with most in-stock orders dispatched within 4–5 working days.</p>
              </div>
            </div>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/handyman.png' alt='Premium Granite Range ' className='img-fluid' width={48} height={49} />

                <h3>Manufacturing & Craftsmanship </h3>
                <p>Hand-finished in India by experienced masons using premium granite, with quality controlled by our parent company, Stone Discover.</p>
              </div>
            </div>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                 <Image src='/img/icons/palette.png' alt='quick_phrases' className='img-fluid' width={48} height={49} />
               
                <h3>Premium Granite Range </h3>
                <p>A carefully selected range of premium granite colours and finishes, with additional imported options available for bespoke work.</p>
              </div>
            </div>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/draw.png' alt='Bespoke Design Capability' className='img-fluid' width={48} height={49} />
                <h3>Bespoke Design Capability</h3>
                <p>Custom shapes, sizes, finishes, lettering and detailing available across our product range to meet your specifications.</p>
              </div>
            </div>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/delivery-truck-speed.png' alt='Nationwide Delivery ' className='img-fluid' width={48} height={49} />
                <h3>Nationwide Delivery </h3>
                <p>Reliable UK-wide delivery for wholesale orders, with secure packaging for safe onward handling.</p>
              </div>
            </div>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/ic-02.png' alt='Trade Compliance' className='img-fluid' width={48} height={49} />
                <h3>Trade Compliance</h3>
                <p>Memorials manufactured to meet UK trade requirements, with specifications tailored to cemetery authority standards.</p>
              </div>
            </div>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/ic-04.png' alt='Dedicated Trade Support ' className='img-fluid' width={48} height={49} />
                <h3>Dedicated Trade Support </h3>
                <p>Our team supports order queries, custom specifications and account management, keeping your orders on track.</p>
              </div>
            </div>
            <div className='col-lg-3 d-flex'>
              <div className='card-01'>
                <Image src='/img/icons/ic-01.png' alt='Sample & Catalogue' className='img-fluid' width={48} height={49} />
                <h3>Sample & Catalogue</h3>
                <p>Trade buyers can request physical samples or our full product catalogue before committing to bulk orders : <a href="/catalog-download/">Download Our Catalogue</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='products-section-one m-p-02'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-10 text-center'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-20'>Browse Memorials by <span> : Browse by Design, Size & Colour
                </span></h2>
                <p>Our memorial collection covers every category UK trade buyers need, from classic Ogee and book headstones to heart-shaped and angel memorials, children's headstones, kerb sets, benches, columbaria, plaques and vases. Each piece is available in a range of granite colours and finishes, with custom sizing, lettering and engraving available on request.
                  Funeral homes and cemetery managers typically order benches, plaques and columbaria for memorial gardens, while monumental masons and stone retailers order headstones, kerb sets and bespoke designs for individual plots. Every product is manufactured to UK memorial trade standards, with samples available before bulk ordering. Contact us directly for competitive quotes and tailored solutions.
                </p>

              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='card-02'>
               <div className='card-02-item'>
                  <a href="/memorials/headstones/">
                    <Image src='/img/webpages/memorial-headstones-01.png' alt='Balck Granite Headstones' className='img-fluid' width={435} height={435} />
                    <h3>Headstones</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/heart-headstones/">
                    <Image src='/img/webpages/heart-headstone-01.png' alt='Balck Granite Heart Headstone' className='img-fluid' width={435} height={435} />
                    <h3>Heart Headstone</h3>
                  </a>
                </div>
                 <div className='card-02-item'>
                  <a href="/memorials/book-headstones/">
                    <Image src='/img/webpages/book-headstone-01.png' alt='Balck Granite Book Headstone' className='img-fluid'  width={435} height={435} />
                    <h3>Book Headstone</h3>
                  </a>
                </div>
                
                <div className='card-02-item'>
                  <a href="/memorials/angel-headstone/">
                    <Image src='/img/webpages/angel-grave-01.png' alt='Balck Granite Angel Headstone' className='img-fluid'  width={435} height={435} />
                    <h3>Angel Headstone</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/bespoke/">
                    <Image src='/img/webpages/bespoke-headstone-01.png' alt='Bespoke Headstone' className='img-fluid'  width={435} height={435} />
                    <h3>Bespoke Headstone </h3>
                  </a>
                </div>
                {/* <div className='card-02-item'>
                  <a href="/memorials/childrens-headstones/">
                    <Image src='/img/webpages/children-headstone-01.png' alt='Children Memorial' className='img-fluid'  width={435} height={435} />
                    <h3>Children Memorial</h3>
                  </a>
                </div> */}
                <div className='card-02-item'>
                  <a href="/memorials/kerb-sets/">
                    <Image src='/img/webpages/memorial-kerb-set-01.png' alt='Kerb Sets' className='img-fluid'  width={435} height={435} />
                    <h3>Kerb Sets</h3>
                  </a>
                </div>
                {/* <div className='card-02-item'>
                  <a href="/memorials/benches/">
                    <Image src='/img/webpages/memorial-bench-01.png' alt='Memorial Bench' className='img-fluid'  width={435} height={435} />
                    <h3>Memorial Bench</h3>
                  </a>
                </div> */}
                <div className='card-02-item'>
                  <a href="/memorials/columbarium/">
                    <Image src='/img/webpages/columbarium-01.png' alt='Columbarium' className='img-fluid'  width={435} height={435} />
                    <h3>Columbarium</h3>
                  </a>
                </div>
                <div className='card-02-item'>
                  <a href="/memorials/vases/">
                    <Image src='/img/webpages/memorial-vases-01.png' alt='Balck Granite Vases' className='img-fluid'  width={435} height={435} />
                    <h3>Vases</h3>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className="hero-banner-btn" style={{paddingTop:'40px'}}>
                    <ModelBox className="btn-three" headerText="Scale Your Store!" buttonText="Get Quote Now" />
                    <a href="/memorials/" className="btn btn-four hero-btn">View All<span className="sr-only">View All</span></a>
                  </div>
            </div>
          </div>
        </div>
      </section>

      

      <section className='p-b-100 p-t-80 m-p-04'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-10'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'> Granite Colours & <span>Sourcing</span></h2>
                <p><b>A Wide Range of Premium Granite, Sourced and Finished for Durability</b></p>
                <p>We offer a variety of premium granite colours for wholesale memorial orders, including Absolute Indian Black, Bahama Blue, Indian Aurora, Indian Impala, Imperial Red and Light Grey Granite, alongside imported varieties such as Black Pearl, Olive Green and South African Impala for bespoke designs. Each colour is sourced from trusted quarries and selected for its density, polish quality and long-term weather resistance, important factors for memorials that need to remain legible and structurally sound for decades outdoors.
Granite is cut and polished in-house, allowing us to match colours across multi-piece orders (such as headstone-and-kerb-set combinations) and to offer the same design in multiple colourways depending on stock availability and customer preference. Full details on each granite type, including finish options, are available on our variety of granites
</p>
              </div>
            </div>
          </div>
          <div className='row g-2 sliding-row'>
                      <div className='col-lg-2 col-md-4 sliding-col'>
                        <div className='card-04'>
                          <div className='card-04-item text-center'>
                            <a href="/variety-of-granites/">
                              <Image src='/img/webpages/absolute-black.png' alt='Absolute Black' width={210} height={210} className='img-fluid' />
                              <h4>Absolute Black</h4>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 sliding-col'>
                        <div className='card-04'>
                          <div className='card-04-item text-center'>
                            <a href="/variety-of-granites/">
                              <Image src='/img/webpages/pic-14.jpg' alt='Bahama Blue' width={210} height={210} className='img-fluid' />
                              <h4>Bahama Blue</h4>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 sliding-col'>
                        <div className='card-04'>
                          <div className='card-04-item text-center'>
                            <a href="/variety-of-granites/">
                              <Image src='/img/webpages/pic-15.jpg' alt='Indian Aurora' width={210} height={210} className='img-fluid' />
                              <h4>Indian Aurora</h4>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 sliding-col'>
                        <div className='card-04'>
                          <div className='card-04-item text-center'>
                            <a href="/variety-of-granites/">
                              <Image src='/img/webpages/pic-16.jpg' alt='Imperial Red' width={210} height={210} className='img-fluid' />
                              <h4>Imperial Red</h4>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 sliding-col'>
                        <div className='card-04'>
                          <div className='card-04-item text-center'>
                            <a href="/variety-of-granites/">
                              <Image src='/img/webpages/pic-17.jpg' alt='Jurpana' width={210} height={210} className='img-fluid' />
                              <h4>Jurpana</h4>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-2  col-md-4 sliding-col'>
                        <div className='card-04'>
                          <div className='card-04-item text-center'>
                            <a href="/variety-of-granites/">
                              <Image src='/img/webpages/kuppam-green.png' alt='Kuppam Green' width={210} height={210} className='img-fluid' />
                              <h4>Kuppam Green</h4>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
        </div>
      </section>
     
      <section className='content-section-two p-b-80 m-p-03'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Who We <span>Supply</span></h2>
                <p><b>Built for the UK Memorial Trade</b></p>
                <p>We supply monument suppliers, wholesalers, funeral homes and fabricators throughout the UK, and are one of the largest stockists of granite headstones in the country. Our trade customers include:</p>
              </div>
            </div>
          </div>
          <div className='row g-3'>
            <div className='col-lg-6 align-self-center'>
              <div className='left-card-01-img'>
                <Image src='/img/webpages/pic-06.png' alt='memorial headstones' className='img-fluid' width={553} height={545} />
              </div>
            </div>
            <div className='col-lg-6'>

              <div className='card-03'>
                <ul>
                  <li className='m-b-20'>
                    <h3 className='m-b-20'>Monumental masons</h3>
                    <p>We supply monumental masons with granite headstones, kerb sets, grave markers and bespoke memorials for individual client requirements. Choose from our catalogue range or work with our team on custom shapes, sizes, granite colours, finishes, lettering and detailing to meet specific cemetery requirements.</p>
                  </li>
                  <li className='m-b-20'>
                    <h3 className='m-b-20'>Funeral homes</h3>
                    <p>Funeral homes can source a wide range of memorial benches, plaques, columbaria, urns, vases and headstones for memorial gardens, cemeteries and cremation facilities. Our trade supply model helps funeral businesses access reliable memorial products while offering families a broader choice of designs and finishes.</p>
                  </li>
                  <li>
                    <h3 className='m-b-20'>Stone retailers and importers</h3>
                    <p>We support stone retailers, importers and memorial dealers with catalogue memorials and bespoke products for onward retail. Our range covers popular granite colours, headstone styles, kerb sets and memorial accessories, with UK warehouse distribution helping trade customers maintain stock and fulfil orders efficiently.</p></li>
                </ul>
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
      {/* <section className='p-b-30'>
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
      </section> */}

      <section className='py-4 p-t-80 p-b-80 m-p-04'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9 text-center'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Latest from Our <span>Blog</span></h2>
                <p>Guides and insights for the memorial trade, funeral homes and stone retailers across the UK.</p>
              </div>
            </div>
          </div>
          <div className='row'>
            {latestBlogs.map(post => (
              <div key={post.slug} className='col-lg-4'>
                <div className='card-blog-home'>
                  <Link href={`/blog/${post.slug}`} className='card-blog-home-img'>
                    <Image
                      src={post.banner ? getImageUrl(post.banner) : '/img/sdie-pop.png'}
                      alt={post.title}
                      width={400}
                      height={240}
                      className='img-fluid'
                    />
                  </Link>
                  <div className='card-blog-home-body'>
                    <Link href={`/blog/${post.slug}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <div className='card-blog-home-meta'>
                      <Image
                        width={40}
                        height={40}
                        src={post.author.profilePic ? getProfileImageUrl(post.author.profilePic) : '/img/icons/user-avt.png'}
                        alt="user avatar"
                      />
                      <div className='av-info'>
                        <div className='av-name-a'>{post.author && post.author.name ? post.author.name : 'Unknown'}</div>
                        <div className='av-date-b'>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) || 'Date unknown'} <span>|</span> {post.readtimes || ''}min</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <a href="/blog/" className="btn btn-four m-t-30">View All Blogs<span className="sr-only">View All Blogs</span></a>
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
                  <a href="/product/anton-black-granite-headstone/">
                    <img src='/img/webpages/black-anton-headstone.png' alt='Black Anton Headstone' className='img-fluid' />
                    <h4>Black Anton Headstone</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/memorials/headstones/">
                    <img src='/img/webpages/Mecca-jet-black-headstone.png' alt='Mecca jet black headstone' className='img-fluid' />
                    <h4>Mecca Jet Black Headstone</h4>
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/product/black-granite-ogee-headstone/">
                    <img src='/img/webpages/black-ogee-headstone.png' alt='Black Ogee Headstone' className='img-fluid' />
                    <h4>Black Ogee Headstone</h4>
                  </a>
                </div>
              </div>
            </div>

            <div className='col-lg-3 col-md-6 sliding-col'>
              <div className='card-04'>
                <div className='card-04-item text-center'>
                  <a href="/product/black-granite-ogee-headstone-with-moulding/">
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

export async function getStaticProps() {
  const blogApi = process.env.NEXT_PUBLIC_BLOG_API_URL;
  try {
    const blogRes = await fetch(blogApi);
    if (!blogRes.ok) throw new Error('Failed to fetch posts');
    const posts = await blogRes.json();
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { props: { latestBlogs: posts.slice(0, 3) }, revalidate: 60 };
  } catch (err) {
    console.error('Error fetching latest blogs:', err);
    return { props: { latestBlogs: [] }, revalidate: 60 };
  }
}
