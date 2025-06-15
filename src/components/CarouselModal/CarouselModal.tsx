import React, { useEffect, useState } from "react";
import Image from "next/image";

import ChevronLeftIcon from "./chevron-left.svg";
import ChevronRightIcon from "./chevron-right.svg";
import CloseIcon from "@/assets/close.svg";

interface CarouselModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function CarouselModal({
  images,
  initialIndex,
  onClose,
}: CarouselModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const handlePrev = () => {
    if (index > 0 && !animating) {
      if (typeof document.startViewTransition === "function") {
        setAnimating(true);
        document.documentElement.classList.add("slide-prev");
        const transition = document.startViewTransition(() => {
          setIndex((i) => i - 1);
        });
        transition.finished.finally(() => {
          setAnimating(false);
          document.documentElement.classList.remove("slide-prev");
        });
      } else {
        setIndex((i) => i - 1);
      }
    }
  };

  const handleNext = () => {
    if (index < images.length - 1 && !animating) {
      if (typeof document.startViewTransition === "function") {
        setAnimating(true);
        document.documentElement.classList.add("slide-next");
        const transition = document.startViewTransition(() => {
          setIndex((i) => i + 1);
        });
        transition.finished.finally(() => {
          setAnimating(false);
          document.documentElement.classList.remove("slide-next");
        });
      } else {
        setIndex((i) => i + 1);
      }
    }
  };
  const handleClose = () => {
    onClose();
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70`}
      onClick={handleBackdrop}
    >
      <button
        className="absolute cursor-pointer top-4 right-3 text-white text-2xl bg-black/40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
        onClick={handleClose}
        aria-label="關閉圖片瀏覽"
      >
        <Image src={CloseIcon} alt="關閉" width={24} height={24} />
      </button>
      <div className="w-full aspect-square flex items-center">
        <div className="w-full flex items-center justify-center">
          <button
            className="text-white text-3xl px-3 py-1 bg-black/30 hover:bg-black/60 rounded-l disabled:opacity-30"
            onClick={handlePrev}
            disabled={index === 0 || !!animating}
            aria-label="上一張"
          >
            <Image src={ChevronLeftIcon} alt="上一張" width={24} height={24} />
          </button>
          <div className="relative flex-1 aspect-square flex items-center justify-center overflow-hidden">
            <Image
              style={{ viewTransitionName: "carousel-image" }}
              src={images[index]}
              alt="dog"
              className={`rounded shadow object-cover`}
              fill
            />
          </div>
          <button
            className="text-white text-3xl px-3 py-1 bg-black/30 hover:bg-black/60 rounded-r disabled:opacity-30"
            onClick={handleNext}
            disabled={index === images.length - 1 || !!animating}
            aria-label="下一張"
          >
            <Image src={ChevronRightIcon} alt="下一張" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="text-white mt-2">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
