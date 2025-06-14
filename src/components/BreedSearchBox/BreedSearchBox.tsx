import React from "react";
import Image from "next/image";

import ClearIcon from "@/assets/close.svg";
import SearchIcon from "./search.svg";

interface BreedSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function BreedSearchBox({
  value,
  onChange,
  onClear,
}: BreedSearchBoxProps) {
  return (
    <div className="flex">
      <Image
        className="ml-2"
        src={SearchIcon}
        alt="搜尋框"
        width={24}
        height={24}
      />
      <input
        type="text"
        className="border rounded px-3 py-2 w-full border-none focus:outline-none"
        placeholder="搜尋狗狗品種..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="text-gray-500 hover:text-gray-800 px-2"
          onClick={onClear}
          aria-label="清除搜尋"
        >
          <Image src={ClearIcon} alt="清除" width={24} height={24} />
        </button>
      )}
    </div>
  );
}
