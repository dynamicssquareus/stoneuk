import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";

const BookingForm = ({ onSubmit, productData = null }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    //   const [redirectTimer, setRedirectTimer] = useState(3);
    //   const [timerId, setTimerId] = useState(null);
    const [errors, setErrors] = useState({});
    const [defaultCountryCode, setDefaultCountryCode] = useState("us");
    const [pageUrl, setPageUrl] = useState("");
    const router = useRouter();
    /* ===================== INIT ===================== */
    useEffect(() => {
        setPageUrl(window.location.href);
        fetchCountryCodeByIP();
    }, []);

    const fetchCountryCodeByIP = () => {
        fetch(
            "https://api.ipdata.co?api-key=c87ef34a2d0cd830649eec9a8b2395698490a7baaf414bf95516a3b8"
        )
            .then((res) => res.json())
            .then((data) => {
                setDefaultCountryCode(data.country_code?.toLowerCase() || "us");
            })
            .catch(() => setDefaultCountryCode("us"));
    };

    /* ===================== VALIDATION ===================== */
    const isValidEmail = (email) => {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phone) => {
        const cleaned = phone.replace(/\D/g, "");
        return /^\d{10,15}$/.test(cleaned);
    };

    const validateForm = () => {
        const errs = {};

        if (!name.trim()) {
            errs.name = "Name is required";
        }

        if (!email.trim()) {
            errs.email = "Email is required";
        } else if (!isValidEmail(email)) {
            errs.email = "Invalid email format";
        }

        if (!phone.trim()) {
            errs.phone = "Phone number is required";
        } else if (!isValidPhoneNumber(phone)) {
            errs.phone = "Invalid phone number";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    /* ===================== SUBMIT ===================== */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Honeypot spam check
        const formData = new FormData(e.target);
        if (formData.get("website")) return;

        if (!validateForm()) return;

        setSubmitted(true);

        /* EMAILJS */
        emailjs.send(
            "service_w9qxeft",
            "template_6ni1e9f",
            {
                from_name: name || "",
                from_email: email || "",
                phone_number: phone || "",
                company_name: company || "",
                message: message || "",
                page_url: pageUrl || "",

                product_title: productData?.title || "",
                product_option: productData?.option || "",
                product_price: productData?.price ?? "NA",
               product_size: productData?.size || "NA",
                product_discount:
                    productData?.discount !== undefined &&
                        productData?.discount !== null &&
                        productData?.discount !== ""
                        ? productData.discount
                        : "NA",

                product_yard: productData?.yard || "NA",
            },
            "3b5rTXsmRl05L_8tD"
        );

        /* API SEND */
        await fetch("https://www.minimallyyours.com/api/zohostonediscoverusa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                formName: "Booking Form",
                formtag: "Booking Form",
                name,
                email,
                phone,
                companyname: company,
                message,
                currentPageUrl: pageUrl,
                defaultCountryName: defaultCountryCode,
                productData
            })
        });

        // Reset
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setMessage("");
        setTimeout(() => {
            onSubmit();
            router.push("/thank-you");
        }, 3000);

        // setTimerId(
        //     setInterval(() => {
        //         setRedirectTimer((t) => {
        //             if (t === 0) clearInterval(timerId);
        //             return t - 1;
        //         });
        //     }, 1000)
        // );
    };

    /* ===================== UI ===================== */
    return (
        <form className="form-one" onSubmit={handleSubmit}>

            {/* PRODUCT SUMMARY */}
            {productData && (
                <div className="alert alert-light border rounded-3 mb-4">
                    <p className="mb-1"><b>Product:</b> {productData.title}</p>
                    <p className="mb-1"><b>Option:</b> {productData.option}</p>
                    <p className="mb-1"><b>Price:</b> £{productData.price}</p>
                     <p className="mb-1"><b>Size:</b> {productData.size}</p>
                    {productData.discount && (
                        <p className="mb-0 text-success">
                            <b>Discount:</b> {productData.discount}
                        </p>
                    )}
                </div>
            )}

            {/* NAME */}
            <div className="form-group">
                <input
                    className="form-control"
                    placeholder=""
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    onBlur={() => {
                        if (!name.trim())
                            setErrors({ ...errors, name: "Name is required" });
                    }}
                />
                <label>Full Name</label>
                {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            {/* EMAIL */}
            <div className="form-group">
                <input
                    className="form-control"
                    value={email}
                    placeholder=""
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    onBlur={() => {
                        if (!email.trim())
                            setErrors({ ...errors, email: "Email is required" });
                        else if (!isValidEmail(email))
                            setErrors({ ...errors, email: "Invalid email format" });
                    }}
                />
                <label>Company Email</label>
                {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            {/* PHONE */}
            <div className="form-group">
                <PhoneInput
                    country={defaultCountryCode}
                    value={phone}
                    onChange={(value) => {
                        setPhone(value);
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    inputClass="form-control"
                    enableLongNumbers={true}
                />
                {errors.phone && <div className="text-danger">{errors.phone}</div>}
            </div>

            {/* COMPANY */}
            <div className="form-group">
                <input
                    className="form-control"
                    value={company}
                    placeholder=""
                    onChange={(e) => setCompany(e.target.value)}
                />
                <label>Company Name</label>
            </div>

            {/* MESSAGE */}
            <div className="form-group mb-4">
                <textarea
                    placeholder=""
                    className="form-control"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <label>Message</label>
            </div>

            {/* <button className="btn btn-three w-100" type="submit" disabled={submitted}>
        {submitted ? `Submitting (${redirectTimer})` : "Submit"}
      </button> */}
            <button className="btn btn-three" type="submit" disabled={submitted}>
                {submitted ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default BookingForm;
