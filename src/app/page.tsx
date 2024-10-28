"use client";

import Carousel from "@/components/carousel";
import CardBerita from "@/components/ui/cardBerita";
import Section from "@/components/layout/section";
import Button from "@/components/ui/buttonPrimary";
import CountDown from "@/components/ui/countDown";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center ">
            <Carousel/>

            <Section
                // classname="border border-gray-200"
                title="Berita Terbaru"
                description="Berita terbaru seputar pemilu 2024"
            >
                <div className="flex flex-wrap justify-between">
                    <CardBerita
                        classname="flex-col"
                        title={"Pemilu 2024"}
                        image={"/bawaslu.png"}
                        date={"2024-08-08"}
                        description={"Pemilu 2024 akan segera digelar, berbagai persiapan telah dilakukan oleh KPU dan Bawaslu"}
                        author={"Admin"}
                        href={"/berita/pemilu-2024"}
                    />
                    <CardBerita
                        classname="flex-col"
                        title={"Pemilu 2024"}
                        image={"/bawaslu.png"}
                        date={"2024-08-08"}
                        description={"Pemilu 2024 akan segera digelar, berbagai persiapan telah dilakukan oleh KPU dan Bawaslu"}
                        author={"Admin"}
                        href={"/berita/pemilu-2024"}
                    />
                    <CardBerita
                        classname="flex-col"
                        title={"Pemilu 2024"}
                        image={"/bawaslu.png"}
                        date={"2024-08-08"}
                        description={"Pemilu 2024 akan segera digelar, berbagai persiapan telah dilakukan oleh KPU dan Bawaslu"}
                        author={"Admin"}
                        href={"/berita/pemilu-2024"}
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <Button
                        href="/berita"
                        classname="w-max"
                        txt="Lihat Berita Lainnya"
                    />
                </div>
            </Section>

            <CountDown targetDate={new Date("2024-11-27")}/>
        </div>
    );
}
