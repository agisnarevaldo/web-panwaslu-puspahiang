import Link from "next/link";
import {Card, CardContent, CardTitle} from "@/components/ui/card";

interface CardPengumumanProps {
    title: string,
    author: string,
    date: string,
    slug: string,
    className?: string
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

export default function CardPengmuman({title, author, date, slug, className}: CardPengumumanProps) {
    return (
        <Link href={`/pengumuman/${slug}`}>
            <Card
                className={`${className} my-4 mx-auto shadow-md border hover:border hover:shadow-lg transition-shadow duration-300`}
            >
                <CardContent className="mt-4 flex flex-col gap-4">
                    <p>{author} | {formatDate(date)}</p>
                    <CardTitle>{title}</CardTitle>
                </CardContent>
            </Card>
        </Link>
    )
}