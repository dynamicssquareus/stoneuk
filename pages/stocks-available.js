import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import BookingForm from "@/components/BookingForm";
import Head from 'next/head';
import Image from "next/image";
import ModelBox from '@/components/ModelBox';

import React from 'react';

const Test = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // ✅ Called when Book Now is clicked
  const handleBook = (productData) => {
    setSelectedProduct(productData);
    setShowModal(true);
  };

  const SkeletonCard = () => (
    <div className="col-lg-4 mb-4 d-flex">
      <div className="card-m-01">
        <div className="card-pick skeleton-box" />
        <div className="skeleton-line w-75" />
        <div className="skeleton-line w-100" />
        <div className="skeleton-line w-50" />
      </div>

      <style jsx>{`
      .skeleton-box {
        width: 100%;
        aspect-ratio: 1 / 1;
        background: #eaeaea;
        border-radius: 6px;
        margin-bottom: 30px;
      }
      .skeleton-line {
        height: 14px;
        background: #eaeaea;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .w-75 { width: 75%; }
      .w-100 { width: 100%; }
      .w-50 { width: 50%; }
    `}</style>
    </div>
  );
  return (
    <>
      <Head>
        <title>In-Stock Memorial Headstones in UK | Stone Discover Inventory</title>
        <meta name="description" content="Browse in-stock memorial headstones available for immediate delivery across the UK. View designs, sizes, and finishes from Stone Discover." />
        <link rel="canonical" href="https://www.stonediscover.co.uk/stocks-available/" />
        <meta property="og:locale" content="US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="In-Stock Memorial Headstones in UK | Stone Discover Inventory" />
        <meta property="og:description" content="Browse in-stock memorial headstones available for immediate delivery across the UK. View designs, sizes, and finishes from Stone Discover." />
        <meta property="og:url" content="https://www.stonediscover.co.uk/stocks-available/" />
        <meta property="og:site_name" content="Stone Discover UK" />
        <meta property="og:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Stone Discover UK" />
        <meta name="twitter:title" content="In-Stock Memorial Headstones in UK | Stone Discover Inventory" />
        <meta name="twitter:description" content="Browse in-stock memorial headstones available for immediate delivery across the UK. View designs, sizes, and finishes from Stone Discover." />
        <meta name="twitter:image" content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>


      <div className="container py-5">
        <div className='row justify-content-center'>
          <div className='col-lg-9'>
            <div className='heading-center p-b-40'>
              <h2 className='m-b-30'><span>Stocks</span> Available</h2>
            </div>
          </div>
        </div>
        <div className="row">
  {loading
    ? Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))
    : (
      <>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBook={handleBook}
          />
        ))}

        {/* STATIC CARD AFTER DATA LOAD */}
        <div className="col-lg-4 mb-4">
          <div className="my-new-card">
            <h3>Let’s Build the Right Package for You</h3>
            <p>
              Have specific volume needs or custom requirements? Reach out to us
              for personalised pricing and flexible package options.
            </p>
            <ModelBox
              className="btn-three-black"
              headerText="Scale Your Store!"
              buttonText="Get a Custom Quote"
            />
          </div>
        </div>
      </>
    )
  }
</div>
      </div>
      <section className='p-b-30'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-8'>
              <div className='heading-center p-b-40'>
                <h2 className='m-b-30'><span>Trade pricing. Reliable stock. Faster fulfilment</span></h2>
                <p>Access real-time stock from a UK-based stone importer.
                  Reliable availability, transparent pricing, and exclusive trade discounts for B2B sellers.</p>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="mm-coo">
        <div className="container">
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

      {/* ✅ BOOKING POPUP */}
      {showModal && selectedProduct && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered m-cutome-widt">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h5 className="modal-title">Book Product</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body">
                <BookingForm
                  productData={selectedProduct}
                  onSubmit={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Test;





