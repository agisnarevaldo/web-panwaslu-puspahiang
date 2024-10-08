"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavigateProps = {
  onClick: () => void;
  icon: string;
  position: string;
};

function Navigate({ onClick, icon, position }: NavigateProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute z-10 top-1/2 ${position} transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2`}
    >
      <Icon icon={icon} />
    </button>
  );
}

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ["/1.png", "/2.png", "/3.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen relative">
      <Navigate
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
        }
        icon="mdi:chevron-left"
        position="left-0 rounded-r-md"
      />

      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          layout="fill"
          alt="slide"
          className={`absolute top-0 left-0 ${index === currentSlide ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
        />
      ))}

      <Navigate
        onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
        icon="mdi:chevron-right"
        position="right-0 rounded-l-md"
      />
    </div>
  );
}
