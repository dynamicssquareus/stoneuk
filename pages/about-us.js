import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
export default function About() {
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };



    return (
        <>
            <Head>
                <title>About Stone Discover UK : Memorial Headstones Supplier in UK</title>
                <meta
                    name="description"
                    content="Stone Discover UK is a reliable supplier of wholesale memorial headstones, serving funeral homes and retailers across the UK with quality granite products."
                />
                <link rel="canonical" href="https://www.stonediscover.co.uk/about-us/" />
                <meta property="og:locale" content="US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About Stone Discover UK : Memorial Headstones Supplier in UK" />
                <meta property="og:description" content="Stone Discover UK is a reliable supplier of wholesale memorial headstones, serving funeral homes and retailers across the UK with quality granite products." />
                <meta property="og:url" content="https://www.stonediscover.co.uk/about-us/" />
                <meta property="og:site_name" content="Stone Discover UK" />
                <meta property="og:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@Stone Discover UK" />
                <meta name="twitter:title" content="About Stone Discover UK : Memorial Headstones Supplier in UK" />
                <meta name="twitter:description" content="Stone Discover UK is a reliable supplier of wholesale memorial headstones, serving funeral homes and retailers across the UK with quality granite products." />
                <meta name="twitter:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
            </Head>

            <div className='common-header-banner'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8'>
                            <div className='commn-head'>
                                <h1>About US</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <section className='about-us-section p-b-60 p-t-80 p-b-40 '>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='about-us-image'>
                                <Image src='/img/webpages/memorial-headstones-in-warehouse.png' alt='memorial-headstones-in-warehouse' className='img-fluid' width={553} height={545} />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='about-us-content'>
                                <h2>Stone Discover – The Largest Wholesalers of Granite Monuments in the UK</h2>
                                <p>Stone Discover is one of the largest suppliers of wholesale granite memorials across the United Kingdom. We have been in the stone industry since 1984 and have been providing exceptional experience with our products worldwide.</p>
                                <p>With over a decade of experience in the import business, we have built a huge customer base by delivering excellence every time. We make sure that our dealers and fabricators get the finest quality granite memorials at the most competitive pricing. With safe packaging and countless checks, you get reliable delivery and a seamless service experience.</p>

                            </div>
                        </div>

                    </div>
                </div>
            </section>





            <section className='content-section-two p-b-80 p-t-60 m-p-08 m-p-06'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-lg-6 d-flex align-self-center'>
                            <div className='about-us-content'>
                                <p>We are located in the Southern part of India. From our factories in India, we export Indian Granite Monuments to our warehouses based in Liverpool and Southampton in the UK. Most of our standard monuments and catalogue items are kept in stock in these warehouses. This is how we control the whole process and ensure quick distribution and deliveries to all wholesalers and dealers in the UK.</p>
                                <p>Our modern manufacturing plant in Khammam, India, produces granite memorials and tombstones in a wide variety of Granite colors, such as
                                    Absolute Indian Black Light Grey, Bahama Blue, Indian Aurora, Indian ImpalaImperial Red, and many others.</p>
                                <p>We also have imported granite color varieties like Blue Pearl, olive Green, South African Impala, etc. We offer bespoke designs and possible customizations in terms of colours, textures, finishes, and shapes. Whether you're a fabricator, dealer, or wholesaler, Stone Discover UK is your trusted partner for quality, reliability, and long-term value.</p>
                            </div>
                        </div>
                        <div className='col-lg-6 align-items-center'>
                            <div className='left-card-01-img'>
                                <Image src='/img/webpages/abot-side-01.jpg' alt='abot-side-01' className='img-fluid' width={555} height={436} />
                            </div>
                        </div>

                    </div>
                </div>

            </section>
            <section className='content-section-two p-b-80 p-t-60 m-p-07'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-lg-6 d-flex'>
                            <div className='about-us-content'>
                                <h2>Our Vision</h2>
                                <p>To be the most trusted name in granite memorials globally, popular for unmatched quality, craftsmanship, and reliability. We hold expertise in honouring memories with stone that lasts forever.</p>
                            </div>
                        </div>
                        <div className='col-lg-6 d-flex'>
                            <div className='about-us-content'>
                                <h2>Our Mission</h2>
                                <p>Our mission is to provide superior quality granite monuments to our partners and wholesalers across the UK at the most competitive prices, while maintaining excellence in sourcing, shipping, and delivery.</p>
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
                        <div className='col-lg-6'>
                            <div className='partner-pic'>
                                <img src='/img/webpages/partent-side-pic.jpg' alt='partent-side-pic' />
                            </div>
                        </div>
                        <div className='col-lg-6 align-self-center'>
                            <div className='form-left'>
                                <div className='accordion-one accordion-one-product'>
                                    <Accordion open={open} toggle={toggle}>
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


            <section className='p-b-30 p-t-60 m-p-07'>
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
            <section className='p-t-80 m-p-07'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-9'>
                            <div className='heading-center p-b-40'>
                                <h2 className='m-b-30'>Join Hands with a Reliable <span>Tombstone Supplier</span></h2>
                                <p>Whether you’re a high-volume buyer or expanding your product line, our team is here to support your growth. We understand the B2B dynamics of the memorial industry and deliver not just products—but trust, consistency, and partnership.</p>
                            </div>
                            <div className='button-center-new text-center'>
                                <a href='/get-quote-now' className='btn btn-three'>Request a Quote</a>
                                <a href='/catalog-download' className='btn btn-four'>Request Catalogue</a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
}
