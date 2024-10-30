import Image from "next/image";

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
            <h1 className="text-4xl text-center font-bold mt-4">{titleCapitalized}</h1>
            <span className="h-[1px] w-full bg-secondary block mb-4"></span>
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