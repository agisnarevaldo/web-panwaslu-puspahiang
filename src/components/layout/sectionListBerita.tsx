"use client";

import Section from "@/components/layout/section";
import {useEffect, useState} from "react";
import CardBerita from "@/components/ui/cardBerita";

export default function SectionListBerita() {
    const [berita, setBerita] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/berita');
                const data = await res.json();

                // Periksa apakah data.data adalah array
                if (Array.isArray(data.data)) {
                    setBerita(data.data);
                    // console.log('Data berita:', data.data);
                } else {
                    // Handle error, misalnya:
                    console.error('Data berita tidak valid:', data);
                    setBerita([]); // Atau tampilkan pesan error di UI
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
                setBerita([]); // Atau tampilkan pesan error di UI
            }
        }
        fetchData();
    }, []);
    return (
        <Section title="Berita Terbaru" description="Berita Terlengkap dari Panwaslu Kecamatan Puspahiang">
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
        </Section>
    )
}