import { useState } from "react";

export default function ComboBuilder({
    products,
    onClose,
    onProceed,
}) {
    const [yard, setYard] = useState("");
    const [selectedProducts, setSelectedProducts] =
        useState([]);

    const addProduct = (product, option) => {
        setSelectedProducts((prev) => {
            const exists = prev.find(
                (item) =>
                    item.productId === product.id &&
                    item.option === option.label
            );

            if (exists) return prev;

            return [
                ...prev,
                {
                    productId: product.id,
                    title: product.title,
                    option: option.label,
                    price:
                        option.price ||
                        option.pricePerSet ||
                        0,
                },
            ];
        });
    };

    const total = selectedProducts.reduce(
        (sum, item) =>
            sum + Number(item.price || 0),
        0
    );
    const uniqueYards = [
        ...new Set(
            products
                .map((item) => item.yard)
                .filter(Boolean)
        ),
    ];
    let comboDiscount = 0;

    if (selectedProducts.length >= 4) {
        comboDiscount = 5;
    } else if (selectedProducts.length === 3) {
        comboDiscount = 4;
    } else if (selectedProducts.length === 2) {
        comboDiscount = 2;
    }

    const discountAmount =
        (total * comboDiscount) / 100;

    const finalTotal =
        total - discountAmount;
    return (
        <div
            className="modal fade show d-block"
            style={{
                background: "rgba(0,0,0,.75)",
                zIndex: 9999,
            }}
        >
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content border-0">

                    {/* Header */}
                    <div className="modal-header combo-header">
                        <div>
                            <h3 className="mb-1">Build Your Combo</h3>
                            <p className="mb-0">
                                Select products and create your own package
                            </p>
                        </div>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        />
                    </div>

                    {/* Body */}
                    <div className="modal-body combo-modal-body">

                        {/* Yard Selection */}
                        <div className="combo-yard-box">

                            <label className="form-label fw-bold">
                                Select Yard
                            </label>

                            <select
                                className="form-select"
                                value={yard}
                                disabled={selectedProducts.length > 0}
                                onChange={(e) =>
                                    setYard(e.target.value)
                                }
                            >
                                <option value="">
                                    Choose Yard
                                </option>

                                {uniqueYards.map((yardName) => (
                                    <option
                                        key={yardName}
                                        value={yardName}
                                    >
                                        {yardName}
                                    </option>
                                ))}
                            </select>
                            {selectedProducts.length > 0 && (
                                <button
                                    className="btn btn-outline-danger btn-sm mt-2"
                                    onClick={() => {
                                        setSelectedProducts([]);
                                        setYard("");
                                    }}
                                >
                                    Clear Combo & Change Yard
                                </button>
                            )}
                        </div>

                        <div className="row h-100">

                            {/* Products */}
                            <div className="col-lg-8">

                                <div className="combo-products-area">

                                    <div className="row">

                                        {!yard ? (
                                            <div className="text-center py-5">
                                                <h4>Select Yard First</h4>
                                            </div>
                                        ) : (
                                            products
                                                .filter(
                                                    (product) =>
                                                        product.yard === yard &&
                                                        !selectedProducts.some(
                                                            (item) =>
                                                                item.productId === product.id
                                                        )
                                                )
                                                .map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="col-md-6 col-xl-4 mb-4"
                                                    >
                                                        <div className="combo-product-card">

                                                            <img
                                                                src={product.image}
                                                                alt={product.title}
                                                                className="combo-product-img"
                                                            />

                                                            <div className="p-3">

                                                                <h6 className="combo-product-title">
                                                                    {product.title}
                                                                </h6>
                                                                <div className="small text-muted mb-2">
                                                                    <strong>H/S:</strong> {product.hsSize}
                                                                    <br />
                                                                    <strong>Base:</strong> {product.baseSize}
                                                                </div>

                                                                <select
                                                                    className="form-select mt-3"
                                                                    onChange={(e) => {
                                                                        const option =
                                                                            product.options.find(
                                                                                (o) =>
                                                                                    o.label ===
                                                                                    e.target.value
                                                                            );

                                                                        if (option) {
                                                                            addProduct(
                                                                                product,
                                                                                option
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <option>
                                                                        Select Size
                                                                    </option>

                                                                    {product.options.map(
                                                                        (
                                                                            option,
                                                                            index
                                                                        ) => (
                                                                            <option
                                                                                key={index}
                                                                                value={
                                                                                    option.label
                                                                                }
                                                                            >
                                                                                {
                                                                                    option.label
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>

                                                            </div>

                                                        </div>
                                                    </div>
                                                ))
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* Summary */}
                            <div className="col-lg-4">

                                <div className="combo-summary">

                                    <div className="alert alert-success mb-4">

                                        <strong>Combo Offer</strong>

                                        <ul className="mb-0 mt-2">
                                            <li>2 Products = 2% Off</li>
                                            <li>3 Products = 4% Off</li>
                                            <li>4+ Products = 5% Off</li>
                                        </ul>

                                    </div>

                                    <h4 className="mb-4">
                                        Selected Products
                                    </h4>

                                    {selectedProducts.length ===
                                        0 && (
                                            <div className="text-center py-5 text-muted">
                                                No products selected
                                            </div>
                                        )}

                                    {selectedProducts.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="combo-selected-item"
                                            >
                                                <div className="d-flex justify-content-between">

                                                    <div>

                                                        <h6 className="mb-1">
                                                            {item.title}
                                                        </h6>

                                                        <small>
                                                            {item.option}
                                                        </small>

                                                        <div className="fw-bold text-success mt-2">
                                                            £{item.price}
                                                        </div>

                                                    </div>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            setSelectedProducts(
                                                                selectedProducts.filter(
                                                                    (
                                                                        _,
                                                                        i
                                                                    ) =>
                                                                        i !==
                                                                        index
                                                                )
                                                            )
                                                        }
                                                    >
                                                        ×
                                                    </button>

                                                </div>
                                            </div>
                                        )
                                    )}

                                    <div className="combo-total-box">

                                        <small>Subtotal</small>

                                        <h4>£{total.toFixed(2)}</h4>

                                        {comboDiscount > 0 && (
                                            <>
                                                <div className="mt-2">
                                                    Combo Discount:
                                                    <strong>
                                                        {" "}
                                                        {comboDiscount}%
                                                    </strong>
                                                </div>

                                                <div className="text-warning">
                                                    -£{discountAmount.toFixed(2)}
                                                </div>
                                            </>
                                        )}

                                        <hr />

                                        <small>Final Total</small>

                                        <h2>
                                            £{finalTotal.toFixed(2)}
                                        </h2>

                                    </div>

                                    <button
                                        className="btn btn-success w-100 combo-enquiry-btn"
                                        disabled={
                                            !yard ||
                                            selectedProducts.length ===
                                            0
                                        }
                                        onClick={() =>
                                            onProceed({
                                                yard,
                                                products: selectedProducts,
                                                subtotal: total,
                                                discountPercent: comboDiscount,
                                                discountAmount,
                                                total: finalTotal,
                                            })
                                        }
                                    >
                                        Proceed To Enquiry
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}