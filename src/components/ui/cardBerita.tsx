import Link from "next/link";
import Image from "next/image";
import formatDate from "@/lib/formatDate";

interface CardBeritaProps {
    title: string;
    image: string;
    date: string;
    author: string;
    href: string;
    description: string;
    classname?: string;
}

export default function CardBerita( {title, image, date, author, href, description, classname}: CardBeritaProps ) {
    return (
        <Link
            href={href}
            className={`flex ${classname} p-4 rounded-lg shadow-md dark:shadow-slate-700 my-4 w-[320px] h-[320px] hover:shadow-xl border border-transparent dark:hover:border-gray-600 hover:border hover:border-gray-400 transition-shadow duration-300`}
        >
            <div className="h-40 w-full bg-blue-500 overflow-hidden rounded-lg flex-shrink-0">
                <Image
                    src={image}
                    alt="Berita"
                    width={350}   // Atur lebar landscape
                    height={160}  // Atur tinggi lebih kecil agar landscape
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex-1 mt-2">
                <p className="text-sm text-gray-500">{formatDate(date)} - {author}</p>
                <h2 className="text-lg font-bold -tracking-tight line-clamp-1">{title}</h2>
                <p className="text-gray-600 line-clamp-3 text-sm">{description}</p>
            </div>
        </Link>
    )
}