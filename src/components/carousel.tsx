"use client";

import {Icon} from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import {useEffect, useState} from "react";
import Link from "next/link";
import Button from "@/components/ui/buttonPrimary";

type NavigateProps = {
    onClick: () => void;
    icon: string;
    position: string;
};

function Navigate({onClick, icon, position}: NavigateProps) {
    return (
        <button
            onClick={onClick}
            className={`absolute z-50 top-1/2 ${position} transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2`}
        >
            <Icon icon={icon}/>
        </button>
    );
}

const slides = [
    {
        image: "/bawaslu.png",
        heading: "Selamat Datang di Website Resmi Panwaslu Kecamatan Puspahiang",
        ctaLink: "/profil",
        ctaText: "Tentang Kami",
    },
    {
        image: "/2.png",
        heading: "Kami Menyajikan Berita dan Informasi terkini Sepotaran PEMILU",
        ctaLink: "/berita",
        ctaText: "Baca Berita",
    },
    {
        image: "/3.png",
        heading: "Segera Laporkan Apabila Menemukan Kejadian Pelanggaran PEMILU",
        ctaLink: "/pengaduan",
        ctaText: "Laporkan Kejadian",
    }
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full min-h-screen relative">
            <Navigate
                onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                }
                icon="mdi:chevron-left"
                position="left-0 rounded-r-md"
                aria-label="Slide Sebelumnya"
            />

            {slides.map((slide, index) => (
                <div key={index} className="absolute top-0 left-0 w-full h-full -z-30">
                    <Image
                        src={slide.image}
                        alt={`slide-${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        priority={index === 0}
                        className={`transition-opacity duration-1000 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    />
                </div>
            ))}

            <div className="flex flex-col items-center gap-4 absolute z-10 top-1/3 left-1/2 transform -translate-x-1/2">
                <h1 className="text-4xl font-bold text-white text-center">
                    {slides[currentSlide].heading}
                </h1>
                <Button
                    classname="backdrop-blur-lg hover:text-white"
                    href={slides[currentSlide].ctaLink}
                    // className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    txt={slides[currentSlide].ctaText}
                />
            </div>

            <Navigate
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                icon="mdi:chevron-right"
                position="right-0 rounded-l-md"
                aria-label="Slide Selanjutnya"
            />

            <div className="absolute top-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-[2px] -z-20"></div>
        </div>
    );
}
