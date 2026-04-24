import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
const ImageMagnifier = ({ src, zoomScale = 2, alt = '', sliderRef }) => {
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [bgPos, setBgPos] = useState('0% 0%');
  const [zoomStyle, setZoomStyle] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getZoomWidth = () => {
    const width = window.innerWidth;
    if (width > 1200) return 500;
    if (width > 992) return 400;
    return 200;
  };

  const updateZoomBoxPosition = () => {
    if (window.innerWidth <= 992 || !imgRef.current || !sliderRef.current) return;

    const img = imgRef.current;
    const slider = sliderRef.current;
    const zoomWidth = getZoomWidth();

    // Assuming the slider's position relative to the viewport and image width
    const sliderEnd = slider.offsetLeft + slider.offsetWidth;
    const zoomBoxLeft = sliderEnd + 10;  // Adding a little space after the slider

    const fixedTopPosition = 185; 

    setZoomStyle((prev) => ({
      ...prev,
      top: fixedTopPosition + 'px',
      left: zoomBoxLeft + 'px',  // Adjust the left position to start after the main image slider
      height: img.offsetHeight + 'px',
      width: zoomWidth + 'px',
    }));
};

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return; // Disable on small screens
    updateZoomBoxPosition();
    setVisible(true);
    window.addEventListener('resize', updateZoomBoxPosition);
  };

  const handleMouseLeave = () => {
    setVisible(false);
    window.removeEventListener('resize', updateZoomBoxPosition);
  };

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos(`${x}% ${y}%`);

    setZoomStyle((prev) => ({
      ...prev,
      backgroundPosition: `${x}% ${y}%`,
    }));
  };

  return (
    <>
      <div
        style={{ display: 'inline-block', position: 'relative' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          style={{ maxWidth: '100%', display: 'block' }}
          width={800} // Adjust as needed
          height={800} // Adjust as needed
        />
      </div>

      {isClient && visible &&
        ReactDOM.createPortal(
          <div
            className="zoom-box"
            style={{
              position: 'absolute',
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoomScale * 75}%`,
              backgroundPosition: bgPos,
              backgroundRepeat: 'no-repeat',
              border: '1px solid #ccc',
              pointerEvents: 'none',
              zIndex: 9,
              backgroundColor: '#fff',
              boxShadow: '0 0 6px rgba(0,0,0,0.2)',
              ...zoomStyle,
            }}
          />,
          document.body
        )}
    </>
  );
};

export default ImageMagnifier;
