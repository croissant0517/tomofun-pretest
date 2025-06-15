import React, { useRef } from "react";
import Image from "next/image";
import useSWR from "swr";
import { useVirtualizer } from "@tanstack/react-virtual";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface BreedListProps {
  breeds: string[];
  onSelect: (breed: string) => void;
  loading?: boolean;
}

export default function BreedList({
  breeds,
  onSelect,
  loading,
}: BreedListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: breeds.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 85,
    overscan: 1,
  });

  if (loading || breeds.length === 0) {
    return (
      <div className="text-gray-500 h-full flex-1 flex items-center justify-center">
        {loading ? "載入中..." : "查無品種"}
      </div>
    );
  }

  return (
    <div ref={parentRef} className="h-screen overflow-y-auto">
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <BreedItem breed={breeds[virtualItem.index]} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
}

const BreedItem = ({
  breed,
  onSelect,
}: {
  breed: string;
  onSelect: (breed: string) => void;
}) => {
  const { data, isLoading } = useSWR(
    `https://dog.ceo/api/breed/${breed}/images/random`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );
  const imageUrl = data?.message;

  return (
    <div
      className="px-4 py-3 cursor-pointer hover:bg-foreground hover:text-background transition flex items-center gap-4 border-b border-gray-200 last:border-b-0"
      onClick={() => onSelect(breed)}
    >
      {isLoading ? (
        <div className="w-15 h-15 rounded-full object-cover bg-gray-200 animate-pulse" />
      ) : (
        <Image
          src={imageUrl}
          alt={breed}
          width={60}
          height={60}
          quality={50}
          className="w-15 h-15 rounded-full object-cover"
        />
      )}
      {breed}
    </div>
  );
};
