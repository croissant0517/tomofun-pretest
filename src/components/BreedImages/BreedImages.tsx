import React from "react";
import Image from "next/image";

interface BreedImagesProps {
  images: string[];
  onImageClick: (index: number) => void;
  loading?: boolean;
}

export default function BreedImages({
  images,
  onImageClick,
  loading,
}: BreedImagesProps) {
  if (loading) {
    return <div className="text-gray-500">圖片載入中...</div>;
  }
  if (images.length === 0) {
    return <div className="text-gray-500">查無圖片</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img, i) => (
        <Image
          key={img}
          src={img}
          alt="dog"
          width={100}
          height={100}
          className="rounded shadow cursor-pointer hover:scale-105 transition w-full aspect-square object-cover"
          onClick={() => onImageClick(i)}
        />
      ))}
    </div>
  );
}
