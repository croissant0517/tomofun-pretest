import React, { useEffect, useRef, useState } from 'react';

interface CarouselModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function CarouselModal({ images, initialIndex, onClose }: CarouselModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [animating, setAnimating] = useState<'left' | 'right' | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  function handlePrev() {
    if (index > 0 && !animating) {
      setAnimating('left');
      timeoutRef.current = setTimeout(() => {
        setIndex(i => i - 1);
        setAnimating(null);
      }, 200);
    }
  }
  function handleNext() {
    if (index < images.length - 1 && !animating) {
      setAnimating('right');
      timeoutRef.current = setTimeout(() => {
        setIndex(i => i + 1);
        setAnimating(null);
      }, 200);
    }
  }
  function handleClose() {
    onClose();
  }
  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-fadein"
      onClick={handleBackdrop}
    >
      <div className="relative max-w-2xl w-full flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-white text-2xl bg-black/40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
          onClick={handleClose}
          aria-label="關閉"
        >
          ×
        </button>
        <div className="flex items-center w-full h-[400px] sm:h-[500px]">
          <button
            className="text-white text-3xl px-3 py-1 bg-black/30 hover:bg-black/60 rounded-l disabled:opacity-30"
            onClick={handlePrev}
            disabled={index === 0 || !!animating}
            aria-label="上一張"
          >
            &#8592;
          </button>
          <div className="flex-1 flex items-center justify-center overflow-hidden h-full">
            <img
              src={images[index]}
              alt="dog"
              className={`max-h-full max-w-full rounded shadow transition-transform duration-200 ${animating === 'left' ? '-translate-x-20 opacity-0' : animating === 'right' ? 'translate-x-20 opacity-0' : 'translate-x-0 opacity-100'}`}
              draggable={false}
            />
          </div>
          <button
            className="text-white text-3xl px-3 py-1 bg-black/30 hover:bg-black/60 rounded-r disabled:opacity-30"
            onClick={handleNext}
            disabled={index === images.length - 1 || !!animating}
            aria-label="下一張"
          >
            &#8594;
          </button>
        </div>
        <div className="text-white mt-2">{index + 1} / {images.length}</div>
      </div>
    </div>
  );
} 