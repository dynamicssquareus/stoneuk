import { useState } from "react";
import Image from "next/image";

export default function ProductCard({ product, onBook }) {
    const [selected, setSelected] = useState(product.options[0]);

    return (
        <>
            <div className="col-lg-4 mb-4 d-flex">
                <div className="card-m-01">
                    <div className="card-pick">
                        <Image src={product.image} width={790} height={790} alt="image name" />
                    </div>
                    <h6>{product.title}</h6>
                    <p className="mut">
                        H/S: {product.hsSize} | Base: {product.baseSize}
                    </p>

                    <div className="form-ff">
                        <select
                            className="form-select me-2"
                            value={selected.label}
                            onChange={(e) =>
                                setSelected(
                                    product.options.find((o) => o.label === e.target.value),
                                )
                            }
                        >
                            {product.options.map((opt, i) => (
                                <option key={i} value={opt.label}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <div className="fw-bold-bg">£ {selected.price}</div>
                    </div>

                    <div className="di-sec">
                        {selected.discount && <p className="small-p">{selected.discount}</p>}
                    </div>

                    <p className="small-c">Yard: {product.yard}</p>

                    <button
                        className="btn btnii"
                        onClick={() =>
                            onBook({
                                title: product?.title || "",
                                option: selected?.label || "",
                                price: selected?.price || "",
                                size: `H/S: ${product?.hsSize || "NA"} | Base: ${product?.baseSize || "NA"}`,
                                discount:
                                    selected?.discount !== undefined &&
                                        selected?.discount !== null &&
                                        selected?.discount !== ""
                                        ? selected.discount
                                        : "NA",
                                yard: product?.yard || "NA",
                            })
                        }
                    >
                        Request for Quotation
                    </button>
                </div>
                <style jsx>
                    {`
          .card-m-01 h6 {
            font-family: var(--font-sec) !important;
            font-size: 17px;
            font-weight: bold;
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
          }
          .form-ff {
            display: grid;
            grid-template-columns: 4fr 2fr;
            gap: 0px;
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
            border-radius: 4px 0px 0px 4px ;
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
            font-size: 16px;
            color: #d95404;
            margin-top: -15px;
            margin-bottom: 30px;
          }
            @media (max-width: 767px){
                .small-p{
    font-size: 13px !important;
}
.small-c{
    font-size: 15px !important;
    margin-top: -22px !important;
}
    .form-select{
    border-right-color: #ff8c3a;
    border-radius: 4px;
    margin-bottom: 3px;
    }
    .fw-bold-bg{
    border-radius: 4px;
    }
            }
          
        `}
                </style>
            </div>
        </>
    );
}
