import React, { useState, useEffect } from 'react';
import './App.css';
import LazyImage from './components/LazyImage';
import PerformanceData from './components/PerformanceData';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://api.unsplash.com/photos/random?count=50', {
        headers: {
          Authorization: 'Client-ID 202QbIalQa52JhNZZXIhDO3CruSxf8eoGokVSwxP4-8' 
        }
      });
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="App">
      <h1>Optimized Image Gallery</h1>
      <div className="image-grid">
        {images.map((image, index) => (
          <LazyImage key={index} src={image.urls.regular} alt={image.alt_description} />
        ))}
      </div>
      <div className="performance-data">
        <PerformanceData />
      </div>
    </div>
  );
};
export default App;
