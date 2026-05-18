import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';

import sanitizeHtml from 'sanitize-html';
import ModelBox from '@/components/ModelBox';
import FooterContactFormHome from '@/components/FooterContactFormHome';

const getImageUrl = (img) =>
    img
        ? `${process.env.NEXT_PUBLIC_IMAGE}/${img}`
        : '/img/webpages/product-01.jpg';

export async function getStaticPaths() {
    try {

        const res = await fetch(
            process.env.NEXT_PUBLIC_LOCATION
        );

        const locations = await res.json();

        const paths = locations.map((item) => ({
            params: {
                Location_slug: item.slug,
            },
        }));

        return {
            paths,
            fallback: 'blocking',
        };

    } catch (error) {

        return {
            paths: [],
            fallback: 'blocking',
        };

    }
}

export async function getStaticProps({ params }) {

    try {

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_LOCATION_DETAILS}/${params.Location_slug}`
        );

        if (!res.ok) {
            return {
                notFound: true,
            };
        }

        const data = await res.json();

        const sanitizeOptions = {
            allowedTags:
                sanitizeHtml.defaults.allowedTags.concat([
                    'img',
                    'h2',
                    'h3',
                    'br',
                    'blockquote',
                    'ul',
                    'li',
                    'strong',
                ]),
            allowedAttributes: {
                a: ['href', 'target', 'rel'],
                img: ['src', 'alt'],
                '*': ['class'],
            },
        };

        const location = {
            ...data,
            description: sanitizeHtml(
                data.description || '',
                sanitizeOptions
            ),
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

    const [open, setOpen] = useState('1');

    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

    const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}location/${location.slug}/`;

    const metaTitle =
        location.metaTitle || location.title;

    const metaDescription =
        location.metaDescription ||
        location.shortdescription;

    const heroImage =
        location.banner ||
        location?.galleries?.[0]?.images?.[0];

    return (
        <>

            <Head>
   <meta name="robots" content="noindex, nofollow" />
                <title>
                    {metaTitle}
                </title>

                <meta
                    name='description'
                    content={metaDescription}
                />

                <meta
                    name='keywords'
                    content={location.metaKeywords || ''}
                />

                <link
                    rel='canonical'
                    href={canonicalUrl}
                />

                {/* OPEN GRAPH */}

                <meta
                    property='og:type'
                    content='website'
                />

                <meta
                    property='og:title'
                    content={metaTitle}
                />

                <meta
                    property='og:description'
                    content={metaDescription}
                />

                <meta
                    property='og:url'
                    content={canonicalUrl}
                />

                <meta
                    property='og:site_name'
                    content='Stone Discover UK'
                />

                <meta
                    property='og:image'
                    content={getImageUrl(heroImage)}
                />

                {/* TWITTER */}

                <meta
                    name='twitter:card'
                    content='summary_large_image'
                />

                <meta
                    name='twitter:title'
                    content={metaTitle}
                />

                <meta
                    name='twitter:description'
                    content={metaDescription}
                />

                <meta
                    name='twitter:image'
                    content={getImageUrl(heroImage)}
                />

                {/* SCHEMA */}

                {location?.schemas?.map((schema) => (

                    <script
                        key={schema.id}
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{
                            __html: schema.code,
                        }}
                    />

                ))}

            </Head>

            {/* HERO */}

            <div className='hero-banner-twso'>

                <div className='container'>

                    <div className='row align-items-center'>

                        <div className='col-lg-7'>

                            <div className='hero-banner-two-head-cust'>

                                <h1>
                                    {location.title}
                                </h1>

                                <p>
                                    {location.shortdescription}
                                </p>

                            </div>

                        </div>

                        <div className='col-lg-5'>

                            <div className='hero-banner-two-image'>

                                <Image
                                    src={getImageUrl(heroImage)}
                                    alt={location.title}
                                    width={500}
                                    height={500}
                                    className='img-fluid'
                                    priority
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* DESCRIPTION */}

            <section className='about-us-section p-t-60 p-b-40'>

                <div className='container'>

                    <div className='row'>

                        <div className='col-lg-12'>

                            <div className='about-us-content'>

                                <h2 className='m-b-30'>
                                    About {location.title}
                                </h2>

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            location.description,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* GALLERY */}

            <section className='p-t-40 p-b-60'>

                <div className='container'>

                    <div className='row'>

                        <div className='col-lg-12'>

                            <div className='heading-left p-b-30'>

                                <h2>
                                    Granite Memorial Gallery
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className='row g-4'>

                        {location?.galleries?.[0]?.images?.map(
                            (img, i) => (

                                <div
                                    className='col-lg-3 col-md-6'
                                    key={i}
                                >

                                    <div className='card-06'>

                                        <div className='card-06-item'>

                                            <Image
                                                src={getImageUrl(img)}
                                                width={400}
                                                height={320}
                                                alt={`${location.title}-${i}`}
                                                className='img-fluid rounded-3'
                                            />

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>

            {/* WHY PARTNER */}

            <section className='partner-section p-t-40 p-b-60'>

                <div className='container'>

                    <div className='row'>

                        <div className='col-lg-12'>

                            <div className='heading-left p-b-20'>

                                <h2>
                                    Why Partner With
                                    Stone Discover?
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className='row'>

                        <div className='col-lg-6 align-self-center'>

                            <div className='partner-pic'>

                                <img
                                    src='/img/webpages/headstones-pic.png'
                                    alt='partner'
                                    className='img-fluid'
                                />

                            </div>

                        </div>

                        <div className='col-lg-6 align-self-center'>

                            <div className='accordion-one accordion-one-product'>

                                <Accordion
                                    open={open}
                                    toggle={toggle}
                                >

                                    <AccordionItem>

                                        <AccordionHeader targetId='1'>

                                            <h3>
                                                Direct Manufacturer Advantage
                                            </h3>

                                        </AccordionHeader>

                                        <AccordionBody accordionId='1'>

                                            <p>
                                                No middlemen.
                                                Direct supply from
                                                our facilities in India.
                                            </p>

                                        </AccordionBody>

                                    </AccordionItem>

                                    <AccordionItem>

                                        <AccordionHeader targetId='2'>

                                            <h3>
                                                Consistent Quality
                                            </h3>

                                        </AccordionHeader>

                                        <AccordionBody accordionId='2'>

                                            <p>
                                                Premium Indian granite
                                                crafted with strict
                                                quality control.
                                            </p>

                                        </AccordionBody>

                                    </AccordionItem>

                                    <AccordionItem>

                                        <AccordionHeader targetId='3'>

                                            <h3>
                                                Custom Designs
                                            </h3>

                                        </AccordionHeader>

                                        <AccordionBody accordionId='3'>

                                            <p>
                                                Fully customizable
                                                memorial products
                                                for trade buyers.
                                            </p>

                                        </AccordionBody>

                                    </AccordionItem>

                                    <AccordionItem>

                                        <AccordionHeader targetId='4'>

                                            <h3>
                                                Worldwide Shipping
                                            </h3>

                                        </AccordionHeader>

                                        <AccordionBody accordionId='4'>

                                            <p>
                                                Reliable export and
                                                shipping support
                                                across the UK.
                                            </p>

                                        </AccordionBody>

                                    </AccordionItem>

                                </Accordion>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className='p-t-60 p-b-60'>

                <div className='container'>

                    <div className='row justify-content-center'>

                        <div className='col-lg-9'>

                            <div className='heading-center p-b-40'>

                                <h2 className='m-b-30'>

                                    Join Hands with a Reliable

                                    <span>
                                        {' '}
                                        Tombstone Supplier
                                    </span>

                                </h2>

                                <p>
                                    Whether you’re a high-volume
                                    buyer or expanding your
                                    memorial product range,
                                    our team is here to support
                                    your business growth.
                                </p>

                            </div>

                            <div className='button-center-new text-center'>

                                <ModelBox
                                    className='btn-three'
                                    headerText='Scale Your Store!'
                                    buttonText='Request a Quote'
                                />

                                <a
                                    className='btn-four btn-four-cc'
                                    href='/catalog-download'
                                >
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
                    faqList={location.faqs.filter(
                        (faq) =>
                            faq.question &&
                            faq.answer
                    )}
                />

            )}

        </>
    );
};

export default LocationPage;