import React, { useRef } from "react";
import Image from "next/image";
import { useVirtualizer } from "@tanstack/react-virtual";

interface BreedImagesProps {
  images: string[];
  onImageClick: (index: number) => void;
  loading?: boolean;
}

const GAP_SIZE = 16;
const ROW_HEIGHT = 100;

export default function BreedImages({
  images,
  onImageClick,
  loading,
}: BreedImagesProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(images.length / 3),
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT + GAP_SIZE,
    overscan: 1,
  });

  if (loading) {
    return <div className="text-gray-500">圖片載入中...</div>;
  }
  if (images.length === 0) {
    return <div className="text-gray-500">查無圖片</div>;
  }

  return (
    <div ref={parentRef} className="h-screen overflow-y-auto">
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const startIndex = virtualItem.index * 3;
          const endIndex = startIndex + 3;
          const items = images.slice(startIndex, endIndex);

          return (
            <div
              key={virtualItem.key}
              className="absolute top-0 left-0 w-full grid grid-cols-3 gap-4"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {items.map((img) => (
                <Image
                  key={img}
                  src={img}
                  alt="dog"
                  width={ROW_HEIGHT}
                  height={ROW_HEIGHT}
                  className="rounded shadow cursor-pointer hover:scale-105 transition w-full aspect-square object-cover"
                  onClick={() => onImageClick(virtualItem.index)}
                  priority={virtualItem.index <= rowVirtualizer.getTotalSize()}
                  quality={50}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
