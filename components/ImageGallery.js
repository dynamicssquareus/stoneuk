"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const API_URL =
  "https://stonediscoveruk-apibackend.onrender.com/api/frontend/productgalleryimages";

// ✅ Image helper
const getImageUrl = (img) => {
  if (!img) return "/img/webpages/product-01.jpg";
  if (img.startsWith("http")) return img;
  return `${process.env.NEXT_PUBLIC_IMAGE}/${img.trim()}`;
};

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const observerRef = useRef();

  // 🔥 Flatten API
  const flattenImages = (data) => {
    const result = [];

    data.forEach((item) => {
      item.images?.forEach((img, index) => {
        result.push({
          image: img,
          alt: item.alts?.[index] || "gallery image",
          title: item.titles?.[index] || "",
        });
      });
    });

    return result;
  };

  // 🔹 Fetch data
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const flat = flattenImages(data?.data || data || []);
        setImages(flat);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 🔹 Infinite scroll
  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 8);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <div className="row g-5">
        {images.slice(0, visibleCount).map((img, index) => {
          const isLast = index === visibleCount - 1;

          return (
            <div
              className="col-6 col-md-4 col-lg-3"
              key={index}
              ref={isLast ? lastImageRef : null}
            >
              <div
                className="card border-0 h-100 overflow-hidden"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedImage(img)}
              >
                <div className="ratio ratio-1x1">
                  <Image
                    src={getImageUrl(img.image)}
                    alt={img.alt}
                    title={img.title}
                    className="img-fluid w-100 h-100 object-fit-cover"
                    loading="lazy"
                    width={600}
                    height={600}
                  />
                  
                </div>
                <p className="text-center cus-pp mt-2">
                    {img.title}
                  </p>
              </div>
            </div>
          );
        })}

        {/* Skeleton */}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div className="col-6 col-md-4 col-lg-3" key={i}>
              <div className="card border-0 shadow-sm">
                <div className="ratio ratio-1x1 placeholder-glow">
                  <div className="placeholder w-100 h-100"></div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ❌ Empty */}
      {!loading && images.length === 0 && (
        <div className="text-center py-5 text-muted">
          No images found
        </div>
      )}

      {/* 🔥 MODAL */}
      {selectedImage && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div
              className="modal-content bg-transparent border-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-body text-center p-0">
                <Image
                  src={getImageUrl(selectedImage.image)}
                  alt={selectedImage.alt}
                  className="img-fluid rounded"
                  width={600}
                    height={600}
                />

                {selectedImage.title && (
                  <p className="text-white mt-2">
                    {selectedImage.title}
                  </p>
                )}

                {/* Close button */}
                <button
                  className="btn btn-light position-absolute top-0 end-0 m-3"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}