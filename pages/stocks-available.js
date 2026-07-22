import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import BookingForm from "@/components/BookingForm";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import UpcomingProductCard from "@/components/UpcomingProductCard";

const Test = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [upcomingProducts, setUpcomingProducts] = useState([]);

  const handleBook = (productData) => {
    setSelectedProduct(productData);
    setShowModal(true);
  };

  const loading = !products;

  useEffect(() => {
    fetch("/data/upcoming-products.json")
      .then((res) => res.json())
      .then((data) => setUpcomingProducts(data))
      .catch((err) => console.error("Upcoming products:", err));
  }, []);

  return (
    <>
      <Head>
        <title>
          In-Stock Memorial Headstones in UK | Stone Discover Inventory
        </title>

        <meta
          name="description"
          content="Browse in-stock memorial headstones available for immediate delivery across the UK. View designs, sizes, and finishes from Stone Discover."
        />

        <link
          rel="canonical"
          href="https://www.stonediscover.co.uk/stocks-available/"
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content="In-Stock Memorial Headstones in UK | Stone Discover Inventory"
        />

        <meta
          property="og:description"
          content="Browse in-stock memorial headstones available for immediate delivery across the UK. View designs, sizes, and finishes from Stone Discover."
        />

        <meta
          property="og:url"
          content="https://www.stonediscover.co.uk/stocks-available/"
        />

        <meta property="og:site_name" content="Stone Discover UK" />

        <meta
          property="og:image"
          content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg"
        />

        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/jpeg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Stone Discover UK" />

        <meta
          name="twitter:title"
          content="In-Stock Memorial Headstones in UK | Stone Discover Inventory"
        />

        <meta
          name="twitter:description"
          content="Browse in-stock memorial headstones available for immediate delivery across the UK. View designs, sizes, and finishes from Stone Discover."
        />

        <meta
          name="twitter:image"
          content="https://www.stonediscover.co.uk/img/stone-home-o.jpeg"
        />
      </Head>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="heading-center p-b-40">
              <h2 className="m-b-30">
                <span>Stocks</span> Available
              </h2>
            </div>
          </div>
        </div>

        {/* <div className="row">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div
                className="spinner-border text-dark"
                role="status"
              ></div>

              <h5 className="mt-3">
                Loading Products...
              </h5>

              <p className="text-muted">
                Please wait while we fetch inventory
              </p>
            </div>
          ) : products?.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBook={handleBook}
              />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>No Products Available</h4>

              <p className="text-muted">
                Please check back later.
              </p>
            </div>
          )}
        </div> */}
        <div className="row">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div
                className="spinner-border text-dark"
                role="status"
              ></div>

              <h5 className="mt-3">
                Loading Products...
              </h5>

              <p className="text-muted">
                Please wait while we fetch inventory
              </p>
            </div>
          ) : products?.filter(
            (product) =>
              product?.options?.some(
                (opt) =>
                  !isNaN(
                    Number(opt.price || opt.pricePerSet)
                  ) &&
                  Number(opt.price || opt.pricePerSet) > 0
              )
          ).length > 0 ? (
            products
              .filter(
                (product) =>
                  product?.options?.some(
                    (opt) =>
                      !isNaN(
                        Number(opt.price || opt.pricePerSet)
                      ) &&
                      Number(opt.price || opt.pricePerSet) > 0
                  )
              )
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBook={handleBook}
                />
              ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>No Products Available</h4>

              <p className="text-muted">
                Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>

      <section id="upcoming" className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="heading-center p-b-40">
              <h2 className="m-b-30">
                <span>Arriving</span> Soon
              </h2>

              <p>NEW DESIGNS   |   LIMITED STOCKS   |   FIRST COME, FIRST SERVED</p>
            </div>
          </div>
        </div>

        <div className="row">
          {upcomingProducts.map((product) => (
            <UpcomingProductCard
              key={product.id}
              product={product}
              onBook={handleBook}
            />
          ))}
        </div>
      </section>

      <section className="p-b-30">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="heading-center p-b-40">
                <h2 className="m-b-30">
                  <span>
                    Trade pricing. Reliable stock. Faster fulfilment
                  </span>
                </h2>

                <p>
                  Access real-time stock from a UK-based stone importer.
                  Reliable availability, transparent pricing, and exclusive
                  trade discounts for B2B sellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mm-coo">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card-05">
                <div className="card-05-item">
                  <Image
                    src="/img/icons/icons-1.png"
                    alt="About Us"
                    width={58}
                    height={76}
                  />
                  <span>Quality Craftmanship</span>
                </div>

                <div className="card-05-item">
                  <Image
                    src="/img/icons/icons-2.png"
                    alt="About Us"
                    width={58}
                    height={76}
                  />
                  <span>Nationwide Delivery</span>
                </div>

                <div className="card-05-item">
                  <Image
                    src="/img/icons/icons-3.png"
                    alt="About Us"
                    width={58}
                    height={76}
                  />
                  <span>24*7 Customer Service</span>
                </div>

                <div className="card-05-item">
                  <Image
                    src="/img/icons/icons-4.png"
                    alt="About Us"
                    width={58}
                    height={76}
                  />
                  <span>Custom Designs</span>
                </div>

                <div className="card-05-item">
                  <Image
                    src="/img/icons/icons-5.png"
                    alt="About Us"
                    width={58}
                    height={76}
                  />
                  <span>Experienced Masons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


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
};

export async function getServerSideProps() {
  try {
    const res = await fetch(
      "https://discover-pricecalculator.onrender.com/api/v1/inventories"
    );

    const data = await res.json();

    return {
      props: {
        products: Array.isArray(data)
          ? data
          : data?.data || [],
      },
    };
  } catch (error) {
    console.error("Inventory API Error:", error);

    return {
      props: {
        products: [],
      },
    };
  }
}

export default Test;