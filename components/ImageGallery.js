"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const API_URL =
  "https://stonediscoveruk-apibackend.onrender.com/api/frontend/productgalleryimages";

const getImageUrl = (img) => {
  if (!img) return "/img/webpages/product-01.jpg";
  if (img.startsWith("http")) return img;
  return `${process.env.NEXT_PUBLIC_IMAGE}/${img.trim()}`;
};

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(null);

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

  // 🔹 Fetch
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setImages(flattenImages(data?.data || data || []));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 🔹 Keyboard control
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, images]);

  // 🔹 Controls
  const openModal = (index) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Image Gallery</h2>

      {/* 🔥 GRID */}
      <div className="row g-4">
        {images.slice(0, visibleCount).map((img, index) => (
          <div className="col-6 col-md-4 col-lg-3" key={index}>
            <div
              className="gallery-card"
              onClick={() => openModal(index)}
            >
              <div className="img-wrap">
                <Image
                  src={getImageUrl(img.image)}
                  alt={img.alt}
                  fill
                  className="gallery-img"
                />
              </div>

              <div className="overlay">
                <span>View</span>
              </div>

              {img.title && <p className="title">{img.title}</p>}
            </div>
          </div>
        ))}

        {/* Skeleton */}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div className="col-6 col-md-4 col-lg-3" key={i}>
              <div className="placeholder-glow">
                <div className="placeholder w-100 ratio ratio-1x1"></div>
              </div>
            </div>
          ))}
      </div>

      {/* 🔥 LOAD MORE */}
      {!loading && visibleCount < images.length && (
        <div className="text-center mt-4">
          <button
            className="btn btn-dark px-4 py-2"
            onClick={() => setVisibleCount((prev) => prev + 8)}
          >
            Load More
          </button>
        </div>
      )}

      {/* ❌ EMPTY */}
      {!loading && images.length === 0 && (
        <div className="text-center py-5 text-muted">
          No images found
        </div>
      )}

      {/* 🔥 MODAL */}
      {currentIndex !== null && (
        <div className="custom-modal" onClick={closeModal}>
          <div
            className="modal-content-custom"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageUrl(images[currentIndex].image)}
              alt={images[currentIndex].alt}
              width={900}
              height={900}
              className="modal-img"
            />

            {images[currentIndex].title && (
              <p className="text-white mt-2">
                {images[currentIndex].title}
              </p>
            )}

            {/* CLOSE */}
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>

            {/* ARROWS */}
            <button className="nav-btn left" onClick={prevImage}>
              ❮
            </button>

            <button className="nav-btn right" onClick={nextImage}>
              ❯
            </button>
          </div>
        </div>
      )}
    </div>
  );
}