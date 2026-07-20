import { useState } from "react";

export default function ComboBuilder({
    products,
    onClose,
    onProceed,
}) {
    const [selectedProducts, setSelectedProducts] =
        useState([]);

    const getPalletCount = (product, option) => {
        const palletCount =
            option?.pallets ??
            option?.pallet ??
            option?.palletCount ??
            option?.pallet_count ??
            option?.palletsCount ??
            option?.noOfPallets ??
            product?.pallets ??
            product?.pallet ??
            product?.palletCount ??
            product?.pallet_count ??
            product?.palletsCount ??
            product?.noOfPallets ??
            1;

        const numericPalletCount = Number(palletCount);

        return Number.isFinite(numericPalletCount) && numericPalletCount > 0
            ? numericPalletCount
            : 1;
    };

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
                    yard: product.yard || "NA",
                    option: option.label,
                    price:
                        option.price ||
                        option.pricePerSet ||
                        0,
                    palletCount: getPalletCount(product, option),
                },
            ];
        });
    };

    const total = selectedProducts.reduce(
        (sum, item) =>
            sum + Number(item.price || 0),
        0
    );
    const totalPallets = selectedProducts.reduce(
        (sum, item) =>
            sum + Number(item.palletCount || 0),
        0
    );
    const selectedYards = [
        ...new Set(
            selectedProducts
                .map((item) => item.yard)
                .filter(Boolean)
        ),
    ];
    const selectedYardText =
        selectedYards.length === 0
            ? "NA"
            : selectedYards.join(", ");
    let comboDiscount = 0;

    if (totalPallets >= 4) {
        comboDiscount = 7;
    } else if (totalPallets === 3) {
        comboDiscount = 5;
    } else if (totalPallets === 2) {
        comboDiscount = 3;
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

                        <div className="row h-100">

                            {/* Products */}
                            <div className="col-lg-8">

                                <div className="combo-products-area">

                                    <div className="row">

                                        {products
                                            .filter(
                                                (product) =>
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
                                                                    <br />
                                                                    <strong>Yard:</strong> {product.yard || "NA"}
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
                                                ))}

                                    </div>

                                </div>

                            </div>

                            {/* Summary */}
                            <div className="col-lg-4">

                                <div className="combo-summary">

                                    <div className="alert alert-success mb-4">

                                        <strong>Combo Offer</strong>

                                        <ul className="mb-0 mt-2">
                                            <li>2 Pallets = 3% Off</li>
                                            <li>3 Pallets = 5% Off</li>
                                            <li>4+ Pallets = 7% Off</li>
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

                                                        <div>
                                                            <small>
                                                                Pallets: {item.palletCount}
                                                            </small>
                                                        </div>

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

                                        <div className="mt-2">
                                            Total Pallets:
                                            <strong>
                                                {" "}
                                                {totalPallets}
                                            </strong>
                                        </div>

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
                                            selectedProducts.length ===
                                            0
                                        }
                                        onClick={() =>
                                            onProceed({
                                                yard: selectedYardText,
                                                products: selectedProducts,
                                                palletCount: totalPallets,
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
