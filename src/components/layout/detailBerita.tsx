import Image from "next/image";
import {Icon} from "@iconify/react/dist/iconify.js";
import Link from "next/link";

interface BeritaProps {
    title: string;
    image: string;
    date: string;
    author: string;
    content: string;
}

export default function DetailBerita({ title, content, date, author, image }: BeritaProps) {
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // title to capital case first letter each word
    const titleCapitalized = title.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="max-w-screen-md mx-auto">
            <header className="flex justify-center items-baseline mt-4">
                <Link href="/berita" className="hover:text-neutral-600">
                    <Icon className="flex-initial text-2xl" icon="icon-park-outline:arrow-left" />
                </Link>
                <h1 className="flex-1 text-center text-4xl font-bold">{titleCapitalized}</h1>
            </header>
            <span className="h-[1px] w-full bg-secondary block my-4"></span>
            <p className="text-neutral-600">{author} - {formattedDate}</p>
            <div className="h-72 w-full bg-blue-500 overflow-hidden rounded-lg flex-shrink-0">
                <Image
                    src={image}
                    alt="Berita"
                    width={350}   // Atur lebar landscape
                    height={160}  // Atur tinggi lebih kecil agar landscape
                    className="object-cover w-full h-full"
                />
            </div>
            <p className="text-justify mt-4">{content}</p>
        </div>
    )
}