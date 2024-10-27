import React, { useState } from 'react';
import AOS from 'aos'; // Ensure AOS is imported

import i1 from '../../assets/images/lib1.webp';
import i3 from '../../assets/images/lib2.webp';
import i5 from '../../assets/images/lib3.webp';
import i6 from '../../assets/images/lib4.webp';
import i7 from '../../assets/images/lib5.webp';
import i9 from '../../assets/images/lib6.avif';
import i10 from '../../assets/images/lib7.avif';
import i11 from '../../assets/images/lib8.avif';
import i12 from '../../assets/images/lib9.avif';

import i13 from '../../assets/images/libor.jpeg';
import i14 from '../../assets/images/libor2.jpeg';
import i15 from '../../assets/images/libor3.jpeg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    { id: 1, name: 'Image 1', url: i1 },
    { id: 3, name: 'Image 3', url: i3 },
    { id: 5, name: 'Image 5', url: i5 },
    { id: 6, name: 'Image 6', url: i6 },
    { id: 7, name: 'Image 7', url: i7 },
    { id: 9, name: 'Image 9', url: i9 },
    { id: 10, name: 'Image 10', url: i10 },
    { id: 11, name: 'Image 11', url: i11 },
    { id: 12, name: 'Image 12', url: i12 },

    { id: 13, name: 'Image 13', url: i13 },
    { id: 14, name: 'Image 14', url: i14 },
    { id: 15, name: 'Image 15', url: i15 },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-r from-orange-800 via-blue-600 to-pink-700">
      <h1 className="text-4xl font-bold text-center text-white mb-12 font-serif tracking-wide" data-aos="fade-up">
        Our Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map(photo => (
          <div
            key={photo.id}
            className="group relative border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setSelectedImage(photo.url)}
            data-aos="fade-up" // Add fade-up animation
          >
            <img
              src={photo.url}
              alt={photo.name}
              className="w-full h-60 object-cover object-center transition-opacity duration-300 ease-in-out group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">View</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6 transition-opacity duration-500"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[80vh]">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto object-contain rounded-lg shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <button
              className="absolute top-4 right-4 text-white bg-white hover:bg-[#7b4a2f] rounded-full py-2 px-3 focus:outline-none transition-colors duration-200"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
