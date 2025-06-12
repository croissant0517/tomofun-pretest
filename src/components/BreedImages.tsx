import React from 'react';

interface BreedImagesProps {
  images: string[];
  onImageClick: (index: number) => void;
  loading?: boolean;
}

export default function BreedImages({ images, onImageClick, loading }: BreedImagesProps) {
  if (loading) {
    return <div className="text-gray-500">圖片載入中...</div>;
  }
  if (images.length === 0) {
    return <div className="text-gray-500">查無圖片</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt="dog"
          className="rounded shadow cursor-pointer hover:scale-105 transition"
          onClick={() => onImageClick(i)}
        />
      ))}
    </div>
  );
} 