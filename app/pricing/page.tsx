'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const locations = [
  "Suvarnabhumi airport",
  "Donmeung airport",
  "BKK city",
  "U-Tapao Airport",
  "Huahin",
  "Baan Phe Pier"
];

const prices = [
  [1100, 1200, 1300, 1600],
  [1400, 1500, 1600, 2100],
  [1300, 1400, 1500, 1900],
  [700, 800, 900, 1200],
  [2700, 2800, 3200, 3800],
  [1000, 1100, 1200, 1400]
];

const carTypes = ["Sedan", "Camry", "Innova/Fortuner", "Van"];

export default function Pricing() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100  text-gray-700 to-indigo-200 py-12 pt-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-2">
          Pattaya and Bangkok to Destination Pricing
        </h2>
        <h4 className="text-lg sm:text-xl font-semibold text-gray-700 text-center mb-8">
          ราคาค่าบริการจากพัทยาและกรุงเทพไปยังจุดหมายปลายทาง
        </h4>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
              {locations.map((location, index) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(index)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    selectedLocation === index
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {carTypes.map((type, index) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {type}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-600">
                    ฿{prices[selectedLocation][index]}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">One way</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg inline-block"
          >
            <p className="font-semibold text-sm sm:text-base">
              Price is the same for both one-way and return trips!
              <br />
              <span className="text-xs sm:text-sm">
                ราคาเดียวกันสำหรับเที่ยวเดียวและไป-กลับ
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}