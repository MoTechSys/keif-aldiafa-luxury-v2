"use client";

import { useState } from "react";
import Image from "next/image";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fill?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  sizes?: string;
  quality?: number;
}

/**
 * ImageWithFallback - Next.js Image component with error fallback.
 * Uses next/image for automatic optimization (WebP/AVIF, lazy loading, srcset).
 */
export function ImageWithFallback({
  src,
  alt,
  className,
  priority = false,
  loading,
  fill = false,
  width,
  height,
  style,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  quality = 80,
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    return (
      <div
        className={`inline-block bg-[#1a1a1a] text-center align-middle ${className ?? ""}`}
        style={style}
        role="img"
        aria-label={`خطأ في تحميل الصورة: ${alt}`}
      >
        <div className="flex items-center justify-center w-full h-full min-h-[80px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ERROR_IMG_SRC}
            alt="خطأ في تحميل الصورة"
            width={88}
            height={88}
            data-original-url={src}
          />
        </div>
      </div>
    );
  }

  // Use next/image for optimization
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        style={style}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? "eager" : loading || "lazy"}
        onError={() => setDidError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      style={style}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : loading || "lazy"}
      onError={() => setDidError(true)}
    />
  );
}
