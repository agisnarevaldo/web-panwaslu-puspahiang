import Image from "next/image";
import {Icon} from "@iconify/react/dist/iconify.js";
import Link from "next/link";

interface BeritaProps {
    title: string;
    image?: string;
    date: string;
    author: string;
    content: string;
    link?: string;
    backUrl: string;
}

export default function DetailBerita({ title, content, date, author, image, link, backUrl }: BeritaProps) {
    const formattedDate = new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // title to capital case first letter each word
    const titleCapitalized = title.replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="max-w-screen-md mx-auto">
            <header className="flex gap-4 justify-center items-baseline mt-4">
                <Link href={backUrl} className="hover:text-neutral-600">
                    <Icon className="flex-initial text-2xl" icon="icon-park-outline:arrow-left" />
                </Link>
                <h1 className="flex-1 text-4xl font-bold">{titleCapitalized}</h1>
            </header>
            <span className="h-[1px] w-full bg-secondary block my-4"></span>
            <p className="text-neutral-600">{author} - {formattedDate}</p>
            {image && ( // Jika image tidak kosong, tampilkan gambar
                <div className="h-[400px] w-full relative overflow-hidden rounded-lg">
                    <Image
                        src={image}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            )}
            <p className="text-justify mt-4">{content}</p>
            {link && (
                <a href={link} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center w-max">
                    {link}<Icon icon="line-md:external-link" />
                </a>
            )}
        </div>
    )
}