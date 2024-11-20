"use client";

import Carousel from "@/components/carousel";
import CountDown from "@/components/ui/countDown";
import SectionTopBerita from "@/components/layout/sectionTopBerita";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center ">
            <Carousel/>

            <SectionTopBerita/>

            <CountDown targetDate={new Date("2024-11-27")}/>
        </div>
    );
}
