"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import BreedSearchBox from "@/components/BreedSearchBox/BreedSearchBox";
import BreedList from "@/components/BreedList/BreedList";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BreedsPage() {
  const router = useRouter();
  const { data, isLoading } = useSWR(
    "https://dog.ceo/api/breeds/list/all",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const [search, setSearch] = useState("");

  // 保留搜尋條件
  useEffect(() => {
    const saved = localStorage.getItem("breed_search");
    if (saved) setSearch(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("breed_search", search);
  }, [search]);

  const breeds: string[] = data ? Object.keys(data.message) : [];
  const filtered = breeds.filter((b) => b.includes(search.toLowerCase()));

  return (
    <main className="max-w-2xl mx-auto min-h-screen flex flex-col">
      <div className="m-4">
        <BreedSearchBox
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />
      </div>
      <BreedList
        breeds={filtered}
        loading={isLoading}
        onSelect={(breed) =>
          router.push(`/breeds/${encodeURIComponent(breed)}`)
        }
      />
    </main>
  );
}
