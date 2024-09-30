'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

export default function GalleryOverview() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const itemsPerPage = 6;

  const fetchGalleries = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/gallery?page=${currentPage}&limit=${itemsPerPage}`);
      if (response.ok) {
        const data = await response.json();
        setGalleries(data.galleries);
        setTotalPages(Math.ceil(data.totalItems / itemsPerPage));
      } else {
        throw new Error('Failed to fetch galleries');
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      alert('Failed to load galleries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchGalleries();
    // Set up an interval to fetch galleries every 5 seconds
    const intervalId = setInterval(fetchGalleries, 5000);
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchGalleries]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/gallery/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchGalleries(); // Refresh the list
        } else {
          throw new Error('Failed to delete gallery item');
        }
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        alert('Failed to delete gallery item. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-20 py-8">
      <h1 className="text-3xl text-center font-bold mb-8">Gallery Overview</h1>
      <Link href="/gallerys/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block">
        Add New Image
      </Link>
      {isLoading && galleries.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover" 
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.jpg'; // Use a placeholder image if loading fails
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <div className="flex justify-between">
                  <Link href={`/gallerys/edit/${item.id}`} className="text-blue-500 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}