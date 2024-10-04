'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Car {
  name: string;
  image?: string;
  images?: string[];
  capacity: string;
}

const carData: Car[] = [
  {
    name: "Camry car sedan or similar",
    image: "/images/camry.png",
    capacity: "for 2 Customers and 3 Normal Size luggage"
  },
  {
    name: "FORTUNER / INNOVA or SUV",
    images: ["/images/fortuner.png", "/images/innova.png"],
    capacity: "for 4 Customers and 6 Normal Size luggage"
  },
  {
    name: "MINIBUS / VIP VAN",
    image: "/images/van.png",
    capacity: "for 9 Customers and 9 Normal Size luggage"
  }
];

const CarSection: React.FC<{ car: Car; index: number }> = ({ car, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white rounded-lg overflow-hidden mb-16"
    >
      <div className="p-6 space-y-4">
        <h3 
          className="text-2xl font-bold text-center text-gray-800 cursor-pointer relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {car.name}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </h3>
        <p className="text-md text-gray-600 text-center">{car.capacity}</p>
        <div className="flex justify-center space-x-4">
          {car.images ? (
            car.images.map((image, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Image 
                  src={image} 
                  alt={`${car.name} ${idx + 1}`} 
                  width={400} 
                  height={225} 
                  className="object-contain rounded-lg"
                />
              </motion.div>
            ))
          ) : car.image ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Image 
                src={car.image} 
                alt={car.name} 
                width={500} 
                height={281} 
                className="object-contain rounded-lg"
              />
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default function OurServices() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2  
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-900 text-center mb-16"
        >
          Our Services
        </motion.h2>
        
        <div className="space-y-24">
          {carData.map((car, index) => (
            <CarSection key={car.name} car={car} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}




