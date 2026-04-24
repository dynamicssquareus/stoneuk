'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function ProductGallery({
  images = [],
  title = '',
  sticky = true,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="product-gallery"
      style={sticky ? { position: 'sticky', top: '100px' } : {}}
    >
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        className="main-swiper main-swiper-gal"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img}
              alt={title}
              width={600}
              height={600}
              priority={index === 0}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      {images.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          style={{ marginTop: '15px' }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                alt={`${title} thumbnail`}
                width={100}
                height={100}
                style={{
                  width: '100%',
                  height: 'auto',
                  cursor: 'pointer',
                  borderRadius: '6px',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
