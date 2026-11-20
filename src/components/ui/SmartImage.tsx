import { useState } from "react";
import { FALLBACK_IMAGE, type MediaImage } from "@/data/media";

interface SmartImageProps {
  image: MediaImage;
  /** Use the lighter `thumb` version (cards, grids). */
  useThumb?: boolean;
  /** Tailwind classes for the frame, e.g. an aspect ratio. */
  className?: string;
  imgClassName?: string;
  /** Set for images visible on first paint (heroes). */
  priority?: boolean;
  /** Override the alt text, or pass "" for purely decorative use. */
  alt?: string;
}

/**
 * Framed, cropped image with a soft fade-in and an automatic fallback if the
 * source fails to load, so a broken link never shows a broken-image icon.
 */
export default function SmartImage({
  image,
  useThumb = false,
  className = "",
  imgClassName = "",
  priority = false,
  alt,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const source = failed ? FALLBACK_IMAGE : useThumb ? (image.thumb ?? image.src) : image.src;

  return (
    <div className={`relative overflow-hidden bg-stone ${className}`}>
      <img
        src={source}
        alt={alt ?? image.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) setFailed(true);
          setLoaded(true);
        }}
        ref={(node) => {
          if (node?.complete && node.naturalWidth > 0 && !loaded) setLoaded(true);
        }}
        style={{ objectPosition: failed ? "center" : image.focus }}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-slow ease-editorial ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}
