'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

export default function GalleryPreview() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGalleries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGalleries(data.galleries);
      } else {
        throw new Error('Failed to fetch galleries');
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleries();
  }, [fetchGalleries]);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleries.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleries.length) % galleries.length);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Gallery</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {galleries.map((item, index) => (
              <SwiperSlide key={item.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <img 
                    src={item.image} 
                    alt={`image-${item.id}`} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-3xl w-full mx-4">
            <img
              src={galleries[currentImageIndex].image}
              alt={`modal-image-${galleries[currentImageIndex].id}`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="mt-4 flex justify-between items-center">
              <button onClick={prevImage} className="text-white text-2xl">
                &#8592; Previous
              </button>
              <h3 className="text-white text-xl">{galleries[currentImageIndex].title}</h3>
              <button onClick={nextImage} className="text-white text-2xl">
                Next &#8594;
              </button>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}