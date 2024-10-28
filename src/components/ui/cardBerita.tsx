import Link from "next/link";
import Image from "next/image";

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
            className={`flex ${classname} p-4 rounded-lg shadow-md dark:shadow-slate-700 my-4 w-80 hover:shadow-xl border border-transparent dark:hover:border-gray-600 hover:border hover:border-gray-400 transition-shadow duration-300`}
        >
            <Image
                src={image}
                alt="Berita"
                width={300}
                height={200}
                className="rounded-lg mb-2"
            />
            <div>
                <p className="text-sm text-gray-500">{date} - {author}</p>
                <h2 className="text-lg font-bold -tracking-tight line-clamp-2">{title}</h2>
                <p className="text-gray-600 line-clamp-3">{description}</p>
            </div>
        </Link>
    )
}