import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';

import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';
import ModelBox from '@/components/ModelBox';

export const getStaticProps = async () => {
    try {
        const res = await fetch(
            process.env.NEXT_PUBLIC_LOCATION
        );

        if (!res.ok) {
            throw new Error('Failed to fetch locations');
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

        const locations = Array.isArray(data)
            ? data.map((item) => ({
                ...item,
                id: item._id || item.slug,
                description: sanitizeHtml(
                    item.description || '',
                    sanitizeOptions
                ),
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

    const [open, setOpen] = useState('1');

    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

    const siteUrl =
        (process.env.NEXT_PUBLIC_SITE_URL || '').replace(
            /\/$/,
            ''
        ) + '/';

    const canonicalUrl = `${siteUrl}location/`;

    const metaTitle =
        'UK Wholesale Granite Headstones Supplier | Stone Discover';

    const metaDescription =
        'Premium granite memorials for funeral homes, memorial dealers and trade buyers across the UK.';

    const metaImage =
        'https://www.stonediscover.co.uk/img/stone-og-inne.jpeg';

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>{metaTitle}</title>

                <meta
                    name='description'
                    content={metaDescription}
                />

                <link
                    rel='canonical'
                    href={canonicalUrl}
                />

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
                    property='og:image'
                    content={metaImage}
                />

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
                    content={metaImage}
                />

                {/* Dynamic Schema */}

                {locations?.map((location) =>
                    location?.schemas?.map((schema) => (
                        <script
                            key={schema.id}
                            type='application/ld+json'
                            dangerouslySetInnerHTML={{
                                __html: schema.code,
                            }}
                        />
                    ))
                )}
            </Head>

            {/* HERO */}

            <div className='hero-banner-twso'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-7'>

                            <div className='hero-banner-two-head-cust'>

                                <h1>
                                    UK Wholesale Granite
                                    Headstones Supplier
                                </h1>

                                <p>
                                    Premium granite memorials
                                    for funeral homes,
                                    memorial dealers and
                                    trade buyers across the UK.
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* LOCATIONS */}

            <section className='p-t-60 p-b-80'>

                <div className='container'>

                    <div className='row'>

                        <div className='col-lg-12'>

                            <div className='heading-left p-b-30'>

                                <h2>
                                    Our Locations
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className='row g-4'>

                        {locations.length > 0 ? (

                            [...locations]
                                .sort((a, b) =>
                                    a.title.localeCompare(
                                        b.title
                                    )
                                )
                                .map((location) => {

                                    const image =
                                        location?.galleries?.[0]
                                            ?.images?.[0];

                                    return (

                                        <div
                                            className='col-lg-3 col-md-6'
                                            key={location.id}
                                        >

                                            <div className='card-06 h-100'>

                                                <div className='card-06-item h-100'>

                                                    <Link
                                                        href={`/location/${location.slug}/`}
                                                    >

                                                        <div className='overflow-hidden rounded-3'>

                                                            <Image
                                                                src={
                                                                    image
                                                                        ? `${process.env.NEXT_PUBLIC_IMAGE}/${image}`
                                                                        : '/img/webpages/product-01.jpg'
                                                                }
                                                                alt={
                                                                    location.title
                                                                }
                                                                className='img-fluid w-100'
                                                                width={400}
                                                                height={300}
                                                            />

                                                        </div>

                                                        <div className='p-3'>

                                                            <h3>
                                                                {
                                                                    location.title
                                                                }
                                                            </h3>

                                                            <p>
                                                                {location.shortdescription?.slice(
                                                                    0,
                                                                    90
                                                                )}
                                                            </p>

                                                        </div>

                                                    </Link>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                })

                        ) : (

                            <div className='col-lg-12'>
                                <p>
                                    No locations found.
                                </p>
                            </div>

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
                                                Direct supply
                                                from our facilities
                                                in India.
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
                                    product range, our team
                                    is here to support your growth.
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

            {/* FEATURES */}

            <section className='p-b-60 p-t-40'>

                <div className='container'>

                    <div className='row justify-content-center'>

                        <div className='col-lg-9'>

                            <div className='heading-center p-b-40'>

                                <h2>
                                    Pillars of Strength
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className='row'>

                        <div className='col-lg-12'>

                            <div className='card-05'>

                                <div className='card-05-item'>

                                    <Image
                                        src='/img/icons/about-pi-01.png'
                                        alt='Quality'
                                        width={48}
                                        height={48}
                                    />

                                    <span>
                                        Finest Quality Stones
                                    </span>

                                    <p>
                                        Premium granite crafted
                                        with attention to detail.
                                    </p>

                                </div>

                                <div className='card-05-item'>

                                    <Image
                                        src='/img/icons/about-pi-02.png'
                                        alt='Pricing'
                                        width={48}
                                        height={48}
                                    />

                                    <span>
                                        Competitive Prices
                                    </span>

                                    <p>
                                        Best wholesale pricing
                                        for memorial dealers.
                                    </p>

                                </div>

                                <div className='card-05-item'>

                                    <Image
                                        src='/img/icons/about-pi-03.png'
                                        alt='Delivery'
                                        width={48}
                                        height={48}
                                    />

                                    <span>
                                        On-time Delivery
                                    </span>

                                    <p>
                                        Reliable shipping and
                                        UK-wide delivery.
                                    </p>

                                </div>

                                <div className='card-05-item'>

                                    <Image
                                        src='/img/icons/about-pi-04.png'
                                        alt='Bulk'
                                        width={48}
                                        height={48}
                                    />

                                    <span>
                                        Bulk Orders
                                    </span>

                                    <p>
                                        Large-scale supply
                                        support for businesses.
                                    </p>

                                </div>

                                <div className='card-05-item'>

                                    <Image
                                        src='/img/icons/about-pi-05.png'
                                        alt='Worldwide'
                                        width={48}
                                        height={48}
                                    />

                                    <span>
                                        Worldwide Shipping
                                    </span>

                                    <p>
                                        Exporting memorials
                                        globally since 1984.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </>
    );
};

export default Index;