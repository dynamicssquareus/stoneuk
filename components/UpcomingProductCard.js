import Image from "next/image";

export default function UpcomingProductCard({ product, onBook }) {
    return (
        <div className="col-lg-4 col-md-6 mb-4 d-flex">
            <div className="card-m-01 card-m-new">

                <div className="card-pick">
                    <Image
                        src={product.image}
                        width={400}
                        height={400}
                        alt={product.title}
                    />
                </div>

                <h6>{product.title}</h6>

                <p className="mut">
                    H/S: {product.hsSize} | Base: {product.baseSize}
                </p>

                {/* <p>{product.description}</p> */}
                {/* {product.options.map((option, index) => (
  <p key={index}>
    {option.label}: £{option.price || option.pricePerSet}
  </p>
))} */}

                <span className="badge floting-com bg-warning text-dark mb-3">
                    Arriving Soon
                </span>

                <button
                    className="btn btnii"
                    onClick={() =>
                        onBook({
                            title: product.title,
                            //   option: product.options?.[0]?.label || "Coming Soon",
                            //   price: product.options?.[0]?.price || "TBA",
                            size: `H/S: ${product.hsSize} | Base: ${product.baseSize}`,
                            //   discount: product.options?.[0]?.discount || "NA",
                            yard: product.yard || "Coming Soon",
                        })
                    }
                >
                    Prebook Now
                </button>

            </div>
        </div>
    );
}