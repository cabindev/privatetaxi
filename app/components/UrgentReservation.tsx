'use client';

import { useState, useEffect } from 'react';
import { FaPhone, FaCommentDots, FaTimes, FaChevronUp } from 'react-icons/fa';

export default function UrgentReservation() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpansion = () => setIsExpanded(!isExpanded);
  const toggleVisibility = () => setIsVisible(!isVisible);

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 left-4 z-50 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors duration-300"
      >
        <FaChevronUp />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div 
        className={`
          flex items-center
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
        `}
      >
        {isExpanded && (
          <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg mr-4 max-w-xs animate-fade-in relative">
            <button
              onClick={toggleVisibility}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold mb-2 text-red-600">Urgent Reservation?</h3>
            <p className="text-sm mb-4">Book now for immediate service!</p>
            
            <a
              href="tel:+66922691269"
              className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-full font-bold text-base hover:bg-red-700 transition-colors duration-300"
            >
              <FaPhone className="mr-2" />
              Call 092-2691269
            </a>
          </div>
        )}
        <button 
          onClick={toggleExpansion}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            text-white text-2xl shadow-lg
            transition-all duration-300 ease-in-out
            ${isExpanded ? 'bg-red-600 rotate-0' : 'bg-red-600 rotate-180'}
          `}
        >
          {isExpanded ? <FaCommentDots /> : <FaPhone />}
        </button>
      </div>
    </div>
  );
}