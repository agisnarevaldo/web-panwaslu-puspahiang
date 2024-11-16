"use client";

import {useEffect, useState} from "react";
import Section from "@/components/layout/section";
import CardPengmuman from "@/components/ui/cardPengumuman";

export default function SectionListPengumuman() {
    const [pengumuman, setPengumuman] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/pengumuman');
                const data = await res.json();

                // Periksa apakah data.data adalah array
                if (Array.isArray(data.data)) {
                    setPengumuman(data.data);
                    // console.log('Data pengumuman:', data.data);
                } else {
                    // Handle error, misalnya:
                    console.error('Data pengumuman tidak valid:', data);
                    setPengumuman([]); // Atau tampilkan pesan error di UI
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
                setPengumuman([]); // Atau tampilkan pesan error di UI
            }
        }
        fetchData();
    }, []);
    return (
        <Section title="Pengumuman" description="Pengumuman resmi dari Panwaslu Kecamatan Puspahiang">
            {pengumuman.map((item: {
                id: string;
                judul: string;
                tglDibuat: string;
                slug: string;
                author: string;
            } ) => (
                <CardPengmuman
                    key={item.id}
                    title={item.judul}
                    author={item.author}
                    date={item.tglDibuat}
                    slug={item.slug}
                />
            ))}
        </Section>
    )
}