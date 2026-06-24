import React from 'react';
import Head from 'next/head';
import ModelBox from '@/components/ModelBox';
import ImageGalleryBrash from '@/components/ImageGalleryBrash';
const VarietyGr = () => {
  return (
    <>
      <Head>
        <title>Premium Metal Urns Supplier UK | Cremation Urns Supplier | Stone Discover UK</title>
        <meta
          name="description"
          content="Premium metal urns supplier in the UK offering brass, aluminium, and cremation urns with wholesale pricing, nationwide delivery, and quality craftsmanship. Get a quote now."
        />
        <link rel="canonical" href="https://www.stonediscover.co.uk/metal-urns/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content=" Premium Metal Urns Supplier UK | Cremation Urns Supplier | Stone Discover UK" />
        <meta property="og:description" content=" Premium metal urns supplier in the UK offering brass, aluminium, and cremation urns with wholesale pricing, nationwide delivery, and quality craftsmanship. Get a quote now." />
        <meta property="og:url" content="https://www.stonediscover.co.uk/metal-urns/" />
        <meta property="og:site_name" content="Stone Discover" />
        <meta property="og:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Stone Discover" />
        <meta name="twitter:title" content=" Premium Metal Urns Supplier UK | Cremation Urns Supplier | Stone Discover UK" />
        <meta name="twitter:description" content=" Premium metal urns supplier in the UK offering brass, aluminium, and cremation urns with wholesale pricing, nationwide delivery, and quality craftsmanship. Get a quote now." />
        <meta name="twitter:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />

      </Head>
      
      <section className='p-b-100 p-t-80 m-p-07'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                 <h1 style={{fontWeight:'bold'}} className='m-b-30'>Premium Metal <span>Urns Supplier in the UK</span></h1>
              </div>
            </div>
          </div>
          <ImageGalleryBrash />
        </div>
      </section>

      <section className='p-t-20'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'>Work with a Reliable Metal Urns <span>Supplier in the UK</span></h2>
                <p>Looking to expand your memorial offering or source premium metal urns in bulk? Stone Discover UK supplies high-quality brass and aluminium urns with wholesale pricing, dependable UK-wide supply, and expert support for funeral homes, memorial retailers, and trade buyers.</p>
              </div>
              <div className='button-center-new text-center'>
                <ModelBox className='btn-three' headerText="Scale Your Store! " buttonText="Request a Quote" />
                <a className='btn-four btn-four-cc' href="/catalog-download">Request Catalogue</a>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VarietyGr;
