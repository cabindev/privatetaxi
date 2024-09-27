'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const images = ['/images/1.jpg', '/images/2.jpg'];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Travel image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-5xl font-bold mb-4 shadow-text">Welcome to Private Taxi Tours</h1>
        <p className="text-2xl mb-8 shadow-text">Explore the world with comfort and style</p>
        <Link href="/contact" className="btn btn-primary btn-lg">
          Book Your Adventure Now
        </Link>
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-amber-500' : 'bg-white/50 hover:bg-amber-500/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}