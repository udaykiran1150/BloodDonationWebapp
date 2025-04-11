import { useState, useEffect } from "react";
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';

const images = [image1, image2, image3, image4];

export default function AutoImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-10 mt-6 overflow-x-hidden">
      <img src={images[index]} alt="Slider" className="w-full h-64  rounded-lg shadow-lg"/>
     
    </div>
  );
}
