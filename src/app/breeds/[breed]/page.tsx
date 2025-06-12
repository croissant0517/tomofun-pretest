'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import BreedImages from '@/components/BreedImages';
import CarouselModal from '@/components/CarouselModal';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BreedImagesPage({ params }: { params: Promise<{ breed: string }> }) {
  const router = useRouter();
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const { breed } = React.use(params)

  const { data, isLoading } = useSWR(
    `https://dog.ceo/api/breed/${breed}/images/random/50`,
    fetcher,
    {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }
  );
  const images: string[] = data?.message || [];

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      {/* 返回按鈕 */}
      <button className="mb-4 text-blue-600" onClick={() => router.back()}>返回</button>
      {/* 標題 */}
      <h1 className="text-2xl font-bold mb-4">{decodeURIComponent(breed)} 的圖片</h1>
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