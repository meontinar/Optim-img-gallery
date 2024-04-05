import React, { useEffect, useRef } from 'react';

const LazyImage = ({ src, alt }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    let observer;
    let didCancel = false;

    const loadImage = () => {
      if (imageRef.current && imageRef.current.src !== src) {
        imageRef.current.src = src;
      }
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
          loadImage();
          observer.unobserve(entry.target);
        }
      });
    };

    if (imageRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(handleIntersection);
      observer.observe(imageRef.current);
    } else {
      loadImage();
    }

    return () => {
      didCancel = true;
      const currentRef = imageRef.current; // Копируем значение ref в переменную
      if (observer && observer.unobserve) {
        observer.unobserve(currentRef); // Используем скопированное значение ref в функции очистки эффекта
      }
    };
  }, [src]);

  return <img ref={imageRef} src={src} alt={alt} />;
};

export default LazyImage;
