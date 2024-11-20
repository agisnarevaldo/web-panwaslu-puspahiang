"use client";

import {useEffect, useState} from "react";
// import CardProfile from "@/components/layout/cardProfile";
import {AnggotaCard} from "@/components/layout/cardAnggota";

export default function SectionAnggota() {
    const [anggota, setAnggota] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/anggota');
                const data = await res.json();

                // Periksa apakah data.data adalah array
                if (Array.isArray(data.data)) {
                    setAnggota(data.data);
                    // console.log('Data anggota:', data.data);
                } else {
                    // Handle error, misalnya:
                    console.error('Data anggota tidak valid:', data);
                    setAnggota([]); // Atau tampilkan pesan error di UI
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
                setAnggota([]); // Atau tampilkan pesan error di UI
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Profil Anggota</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {anggota.map((item: {
                    id: string;
                    nama: string;
                    jabatan: string;
                    periode: string;
                    alamat: string;
                    email: string;
                    photo: string;
                }) => (
                    <AnggotaCard key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}