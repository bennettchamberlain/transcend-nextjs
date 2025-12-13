import Image from "next/image";
import React from "react";

interface SelectPhotosShowcaseProps {
  photos?: string[];
  title?: string;
  className?: string;
  layout?: "grid" | "horizontal" | "vertical";
  showTitle?: boolean;
}

const defaultPhotos = [
  "/images/selects/DSC07886.jpg",
  "/images/selects/DSC08440.jpg",
  "/images/selects/DSC09111.jpg",
  "/images/selects/DSC08471.jpg",
  "/images/selects/Copy of DSC08983-3.jpg",
  "/images/selects/DSC08935.jpg",
];

export function SelectPhotosShowcase({
  photos = defaultPhotos,
  title,
  className = "",
  layout = "grid",
  showTitle = true,
}: SelectPhotosShowcaseProps) {
  const layoutClasses = {
    grid: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
    horizontal: "flex gap-4 overflow-x-auto pb-4",
    vertical: "flex flex-col gap-4",
  };

  return (
    <section className={`select-photos-showcase ${className}`}>
      {showTitle && title && (
        <h2 className="mb-6 text-center font-[Druk] text-2xl font-semibold text-lime-400 uppercase">{title}</h2>
      )}

      <div className={layoutClasses[layout]}>
        {photos.slice(0, 6).map((photo, index) => (
          <div key={`photo-${photo}`} className="group relative min-w-[250px] flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={photo}
              alt={`Transcend Collective - Select Photo ${index + 1}`}
              width={400}
              height={300}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-2 left-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-[Druk] text-xs tracking-wider text-white uppercase">Transcend</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
