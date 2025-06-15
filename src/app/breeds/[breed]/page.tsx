"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import BreedImages from "@/components/BreedImages/BreedImages";

const CarouselModal = dynamic(
  () => import("@/components/CarouselModal/CarouselModal"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

import ChevronLeftIcon from "@/assets/chevron-left.svg";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BreedImagesPage({
  params,
}: {
  params: Promise<{ breed: string }>;
}) {
  const router = useRouter();
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const { breed } = React.use(params);

  const { data, isLoading } = useSWR(
    `https://dog.ceo/api/breed/${breed}/images/random/50`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    }
  );
  const images: string[] = data?.message || [];

  return (
    <main className="max-w-4xl mx-auto p-4">
      {/* 返回按鈕 */}
      <div className="w-full flex mb-4">
        <button className="ml-0" onClick={() => router.back()}>
          <Image src={ChevronLeftIcon} alt="返回" width={24} height={24} />
        </button>
        {/* 標題 */}
        <h1 className="m-auto text-center font-bold" tabIndex={0}>
          {decodeURIComponent(breed)}
        </h1>
      </div>
      {/* 圖片清單元件 */}
      <BreedImages
        images={images}
        loading={isLoading}
        onImageClick={setModalIndex}
      />
      {/* 輪播 Modal 元件 */}
      {modalIndex !== null && (
        <CarouselModal
          images={images}
          initialIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </main>
  );
}
