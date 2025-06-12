import React from 'react';

interface BreedSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function BreedSearchBox({ value, onChange, onClear }: BreedSearchBoxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:border-blue-400"
        placeholder="搜尋狗狗品種..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button
          className="text-gray-500 hover:text-gray-800 px-2"
          onClick={onClear}
          aria-label="清除搜尋"
        >
          清除
        </button>
      )}
    </div>
  );
} 