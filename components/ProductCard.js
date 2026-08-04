import { useState } from "react";
import Image from "next/image";

export default function ProductCard({ product, onBook }) {
    const options = Array.isArray(product.options) ? product.options : [];
    const pricedOptions = options.filter((opt) => {
        const price = Number(opt.price || opt.pricePerSet);

        return Number.isFinite(price) && price > 0;
    });
    const isSoldOut =
        product?.soldOut ||
        product?.status?.toLowerCase() === "sold-out" ||
        pricedOptions.length === 0;
    const [selected, setSelected] = useState(pricedOptions[0] || null);

    const discountText = selected?.discount?.trim();

    const showDiscount =
        discountText &&
        !["no discount", "n/a", "none", "0"].includes(
            discountText.toLowerCase()
        );

    return (
        <>
            <div className="col-lg-4 col-sm-6 mb-4 d-flex">
                <div className="card-m-01">
                    <div className="card-pick">
                        <Image
                            src={product.image}
                            width={400}
                            height={400}
                            alt={product.title?.replace(/&amp;/g, "&")}
                        />
                    </div>
                    <h6> {product.title?.replace(/&amp;/g, "&")}</h6>
                    <p className="mut">
                        H/S: {product.hsSize} | Base: {product.baseSize}
                    </p>

                    {isSoldOut ? (
                        <div className="sold-out-box">
                            Sold Out
                        </div>
                    ) : (
                    <div className="form-ff">
                        <select
                            className="form-select me-2"
                            value={selected?.label || ""}
                            onChange={(e) =>
                                setSelected(
                                    pricedOptions.find((o) => o.label === e.target.value),
                                )
                            }
                        >
                            {pricedOptions.map((opt, i) => (
                                <option key={i} value={opt.label}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <div className="fw-bold-bg">
                            £ {selected.price || selected.pricePerSet}
                        </div>
                    </div>
                    )}

                    <div className="di-sec">
                        {/* {selected.discount && <p className="small-p">{selected.discount}</p>} */}
                        {showDiscount && (
                            <p className="small-p">{discountText}</p>
                        )}
                    </div>

                    <p className="small-c">Yard: {product.yard}</p>

                    <button
                        className="btn btnii"
                        onClick={() => {
                            if (isSoldOut) {
                                onBook({
                                    title: product?.title || "",
                                    option: "Notify me when available",
                                    price: "",
                                    size: `H/S: ${product?.hsSize || "NA"} | Base: ${product?.baseSize || "NA"}`,
                                    discount: "NA",
                                    yard: product?.yard || "NA",
                                    status: "Out of Stock",
                                });
                                return;
                            }

                            onBook({
                                title: product?.title || "",
                                option: selected?.label || "",
                                price: selected?.price || selected?.pricePerSet || "",
                                size: `H/S: ${product?.hsSize || "NA"} | Base: ${product?.baseSize || "NA"}`,
                                discount:
                                    selected?.discount !== undefined &&
                                        selected?.discount !== null &&
                                        selected?.discount !== ""
                                        ? selected.discount
                                        : "NA",
                                yard: product?.yard || "NA",
                                status: "In-Stock",
                            });
                        }}
                    >
                        {isSoldOut ? "Notify Me" : "Enquire Now"}
                    </button>
                </div>
                <style jsx global>
                    {`
            .card-m-01 h6 {
              font-family: var(--font-sec) !important;
              font-size: 16px;
              font-weight: bold;
              text-transform: capitalize;
            }
            .card-m-01 {
              border-radius: 8px;
              background-color: #f7f6f3;
              padding: 15px 15px 30px 15px;
              width: 100%;
            }
            .mut {
              font-family: var(--font-sec) !important;
              font-size: 16px;
              font-weight: normal;
              line-height: 1.5;
              color: #4a4a4a !important;
            }
            .card-m-01 .card-pick {
              text-align: center;
              margin-bottom: 30px;
              width: 100%;
              height: auto;
            }
            .card-pick img {
              width: 100%;
              height: 100%;
            }
            .form-ff {
              display: grid;
              grid-template-columns: 4fr 2fr;
              gap: 0px;
            }
            .sold-out-box {
              border: 1px solid #b55f5f;
              border-radius: 4px;
              background: #b95757;
              color: #ffffff;
              font-size: 15px;
              font-weight: 600;
              padding: 10px 15px;
              text-align: center;
              text-transform: uppercase;
              width: 100%;
            }
            .fw-bold-bg {
              border-radius: 0px 4px 4px 0px;
              background-color: #ff8c3a;
              background-image: linear-gradient(to right, #f9d2ac, #ff8c3a);
              display: flex;
              align-items: center;
              justify-content: right;
              padding-right: 15px;
              font-weight: bold;
              color: #4a4a4a;
              padding: 10px 20px;
            }
            .form-select {
              border-color: #ff8c3a;
              font-size: 15px;
              border-right-color: transparent;
              border-radius: 4px 0px 0px 4px;
            }
            .di-sec {
              height: 20px;
              margin-top: 7px;
              text-align: right;
            }
            .small-p {
              color: #4a4a4a;
              font-weight: bold;
              font-size: 14px;
              margin-bottom: 0;
            }
            .small-c {
              font-size: 14px;
              color: #d95404;
              margin-top: -20px;
              font-weight: 600;
              margin-bottom: 30px;
            }
            @media (max-width: 767px) {
              .small-p {
                font-size: 13px !important;
              }
              .small-c {
                font-size: 15px !important;
                margin-top: -22px !important;
              }
              .form-select {
                border-right-color: #ff8c3a;
                border-radius: 4px;
                margin-bottom: 3px;
              }
              .fw-bold-bg {
                border-radius: 4px;
              }
            }
          `}
                </style>
            </div>
        </>
    );
}
