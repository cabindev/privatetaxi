'use client';

import { useState, useEffect } from 'react';
import { FaPhone, FaCommentDots } from 'react-icons/fa';

export default function UrgentReservation() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExpanded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

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
          <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg mr-4 max-w-xs animate-fade-in">
            <h3 className="text-lg font-bold mb-2 text-red-600">Urgent Reservation?</h3>
            <p className="text-sm mb-4">Book now for immediate service!</p>
            
            <a
              href="tel:+66984914699"
              className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-full font-bold text-base hover:bg-red-700 transition-colors duration-300"
            >
              <FaPhone className="mr-2" />
              Call 092-2691269
            </a>
          </div>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
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
