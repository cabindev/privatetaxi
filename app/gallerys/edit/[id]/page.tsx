'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function EditGallery({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`/api/gallery/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setCurrentImage(data.image);
        } else {
          throw new Error('Failed to fetch gallery');
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        alert('Failed to fetch gallery. Please try again.');
      }
    };
    fetchGallery();
  }, [params.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (newImage) {
      formData.append('image', newImage);
    }

    try {
      const response = await fetch(`/api/gallery/${params.id}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        router.push('/gallerys');
      } else {
        throw new Error('Failed to update gallery');
      }
    } catch (error) {
      console.error('Error updating gallery:', error);
      alert('Failed to update gallery. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Edit Gallery Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-2">Current Image:</label>
          {currentImage && (
            <img src={currentImage} alt={title} className="mb-2 w-full h-48 object-cover" />
          )}
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {imagePreview && (
          <div>
            <p>New Image Preview:</p>
            <img src={imagePreview} alt="New image preview" className="w-full h-48 object-cover" />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update Gallery Item
        </button>
      </form>
    </div>
  );
}