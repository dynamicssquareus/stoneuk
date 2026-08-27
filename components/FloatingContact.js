"use client";

import React from "react";

const FloatingContact = () => {
  return (
    <>
      <div className="floating-contact">

        {/* Phone */}
        <a
          href="tel:+441613941594"
          className="floating-contact-btn phone-btn"
          aria-label="Call us"
        >
          <i className="bi bi-telephone-fill"></i>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/+919667584700"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-contact-btn whatsapp-btn"
          aria-label="WhatsApp us"
        >
          <i className="bi bi-whatsapp"></i>
        </a>

      </div>

      <style jsx>{`
        /* =========================================
           FLOATING CONTACT
        ========================================= */

        .floating-contact {
          position: fixed;
          left: 20px;
          bottom: 25px;
          z-index: 9999;

          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* =========================================
           BUTTON
        ========================================= */

        .floating-contact-btn {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 48px;
          height: 48px;

          border-radius: 50%;

          color: #ffffff;
          text-decoration: none;

          font-size: 19px;

          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        /* =========================================
           PHONE
        ========================================= */

        .phone-btn {
          background: #3f5ca8;
        }

        /* =========================================
           WHATSAPP
        ========================================= */

        .whatsapp-btn {
          background: #25d366;
        }

        /* =========================================
           HOVER
        ========================================= */

        .floating-contact-btn:hover {
          color: #ffffff;
          text-decoration: none;

          transform: translateY(-3px);

          box-shadow: 0 7px 18px rgba(0, 0, 0, 0.25);
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 767px) {
          .floating-contact {
            left: 12px;
            bottom: 15px;
            gap: 8px;
          }

          .floating-contact-btn {
            width: 46px;
            height: 46px;
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingContact;