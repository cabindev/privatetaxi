'use client';

import { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaRoad, FaCheckCircle } from 'react-icons/fa';

const locations = [
  "Suvarnabhumi airport",
  "Donmeung airport",
  "BKK city",
  "U-Tapao Airport",
  "Huahin",
  "Baan Phe Pier"
];

const prices = [
  [1100, 1200, 1300, 1800, 0],
  [1500, 1600, 1800, 2200, 0],
  [1400, 1500, 1600, 2000, 0],
  [700, 800, 900, 1200, 1400],
  [2700, 2800, 3000, 3800, 4400],
  [1000, 1100, 1200, 1500, 0]
];

const carTypes = ["Sedan", "Camry", "Innova/Fortuner", "Van", "All new model Van"];
export default function Pricing() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 py-12 pt-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-2">
          Pattaya and Bangkok to Destination Pricing
        </h2>
        <h4 className="text-lg sm:text-xl font-semibold text-gray-700 text-center mb-8">
          ราคาค่าบริการจากพัทยาและกรุงเทพไปยังจุดหมายปลายทาง
        </h4>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8 relative">
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
              {carTypes.map(
                (type, index) =>
                  prices[selectedLocation][index] > 0 && (
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
                      <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        One way
                      </p>
                    </motion.div>
                  )
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-4 mt-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg shadow-sm"
          >
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center pl-4 mb-2"
            >
              <FaRoad className="text-indigo-600 mr-2" />
              <p className="text-left text-indigo-700 font-semibold">
                Including Highway !
              </p>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center pl-4"
            >
              <FaCheckCircle className="text-green-500 mr-2" />
              <p className="text-left text-gray-700">ราคานี้รวมทางด่วนแล้ว !</p>
            </motion.div>
          </motion.div>
          {/* Other Please Call */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-4 right-4 bg-indigo-600 text-white rounded-full p-2 shadow-lg hover:bg-indigo-700 transition-colors"
          >
            <a
              href="tel:+092-2691269"
              className="flex items-center justify-center text-xs"
            >
              <FaPhone className="mr-1" />
              <span>Other Please Call</span>
            </a>
          </motion.div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg inline-block"
          >
            <div className="text-center">
              <p className="font-semibold text-sm sm:text-base text-left inline-block">
                Price is the same for both one-way and return trips!
                <br />
                <span className="text-xs sm:text-sm">
                  ราคาเดียวกันสำหรับเที่ยวเดียวและไป-กลับ
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}