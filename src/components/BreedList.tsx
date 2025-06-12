import React from 'react';

interface BreedListProps {
  breeds: string[];
  onSelect: (breed: string) => void;
  loading?: boolean;
}

export default function BreedList({ breeds, onSelect, loading }: BreedListProps) {
  if (loading) {
    return <div className="text-gray-500">載入中...</div>;
  }
  if (breeds.length === 0) {
    return <div className="text-gray-500">查無品種</div>;
  }
  return (
    <ul className="divide-y border rounded bg-white shadow">
      {breeds.map(breed => (
        <li
          key={breed}
          className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition"
          onClick={() => onSelect(breed)}
        >
          {breed}
        </li>
      ))}
    </ul>
  );
} 