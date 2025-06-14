import React from "react";
import Image from "next/image";
import useSWR from "swr";

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
  if (loading || breeds.length === 0) {
    return (
      <div className="text-gray-500 h-full flex-1 flex items-center justify-center">
        {loading ? "載入中..." : "查無品種"}
      </div>
    );
  }

  return (
    <ul tabIndex={0} className="">
      {breeds.map((breed) => {
        return <BreedItem key={breed} breed={breed} onSelect={onSelect} />;
      })}
    </ul>
  );
}

const BreedItem = ({
  breed,
  onSelect,
}: {
  breed: string;
  onSelect: (breed: string) => void;
}) => {
  const { data } = useSWR(
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
    <li
      className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition flex items-center gap-4"
      onClick={() => onSelect(breed)}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={breed}
          width={60}
          height={60}
          className="w-15 h-15 rounded-full"
        />
      )}
      {breed}
    </li>
  );
};
