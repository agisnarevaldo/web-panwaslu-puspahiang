import {useEffect, useState} from "react";
import Section from "@/components/layout/section";
import CardBerita from "@/components/ui/cardBerita";
import Button from "@/components/ui/buttonPrimary";

export default function SectionTopBerita() {
    const [berita, setBerita] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/berita');
            const data = await res.json();
            setBerita(data.data.slice(0, 3));
        };

        fetchData();
    }, []);

    return (
        <Section title="Berita Terbaru" description="Berita terbaru dari Panwaslu Kecamatan Puspahiang">
            <div className="flex flex-wrap justify-between">
                {berita.map((item: {
                    id: string;
                    judul: string;
                    gambar: string;
                    tglDibuat: string;
                    author: string;
                    isi: string;
                    slug: string;
                } ) => (
                    <CardBerita
                        key={item.id}
                        classname="flex-col h-max"
                        title={item.judul}
                        image={item.gambar}
                        date={item.tglDibuat}
                        description={item.isi}
                        author={item.author}
                        href={`/berita/${item.slug}`}
                    />
                ))}
            </div>
            <Button
                txt="Lihat selengkapnya"
                href="/berita"
                classname="w-max mx-auto mt-4"
            />
        </Section>
    )
}