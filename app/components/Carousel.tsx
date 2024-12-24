'use client'
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CAROUSEL_IMAGES = [
  {
    src: '/images/2.jpg',
    alt: 'Private Taxi Service in Pattaya',
    title: 'แท็กซี่พัทยา | Private Taxi Pattaya',
    description: 'บริการแท็กซี่ส่วนตัว รถรับส่งสนามบิน และทัวร์ทั่วไทย'
  },
  {
    src: '/images/1.jpg',
    alt: 'Airport Transfer Service',
    title: 'Airport Transfer Service',
    description: 'Safe and comfortable travel with professional drivers'
  }
] as const;

const SLIDE_DURATION = 5000;

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % CAROUSEL_IMAGES.length
    );
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(goToNextSlide, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [goToNextSlide, isHovered]);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="hero carousel"
    >
      {CAROUSEL_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div 
            className="absolute inset-0 bg-black/30"
            aria-hidden="true"
          />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 md:px-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
          {CAROUSEL_IMAGES[currentIndex].title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-lg">
          {CAROUSEL_IMAGES[currentIndex].description}
        </p>
        <Link
          href="/contact"
          className="btn btn-lg bg-gradient-to-r from-indigo-500 to-purple-600 
             text-white border-none hover:from-indigo-600 hover:to-purple-700 
             transition-all duration-300 shadow-lg hover:shadow-xl 
             transform hover:-translate-y-1"
        >
          Book Your Adventure Now
        </Link>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${index === currentIndex 
                ? "bg-amber-500 scale-125" 
                : "bg-white/60 hover:bg-amber-400"
              }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
    </section>
  );
}