import React from 'react'
import { useState, useEffect } from 'react'
const Slider = ( { images, interval=3000 }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically switch images at the specified interval
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
  
      // Clear interval on component unmount
      return () => clearInterval(timer);
    }, [images.length, interval]);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  return (
    <>
    <div className="relative max-w-lg mx-auto mt-10 p-4 bg-gradient-to-r from-gray-500/80 via-gray-600/80 to-gray-700/80 shadow-lg rounded-lg backdrop-filter backdrop-blur-lg">
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-700"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-700"
      >
        ❯
      </button>
    </div>
    </>
  )
}

export default Slider

