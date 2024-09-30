'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';

const allowedExtensions = [".jpg", ".jpeg", ".webp", ".svg", ".png"];

export default function CreateGallery() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const convertToJPEG = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                const newFile = new File([blob], 'image.jpg', { type: 'image/jpg' });
                resolve(newFile);
              } else {
                reject(new Error('Failed to convert image to JPEG'));
              }
            }, 'image/jpg', 0.9);
          } else {
            reject(new Error('Failed to get canvas context'));
          }
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        toast.error("Only image files are allowed.");
        return;
      }

      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const jpegFile = await convertToJPEG(compressedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(jpegFile);
        setImage(jpegFile);
      } catch (error) {
        console.error("Error processing image", error);
        toast.error("Error processing image");
      }
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Gallery item created successfully');
        router.push('/gallerys');
      } else {
        throw new Error('Failed to create gallery item');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create gallery item');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-40 mb-60">
      <div className="mb-4">
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
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2">Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {imagePreview && (
        <div className="mb-4">
          <img src={imagePreview} alt="Preview" className="max-w-full h-auto" />
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create Gallery Item
      </button>
    </form>
  );
}