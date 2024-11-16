import {Button} from "@/components/ui/button";
import Link from "next/link";
import TabelPengumuman from "@/components/admin/tabelPengumuman";

export default function Page() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Pengumuman</h1>
                <Button asChild>
                    <Link href="./pengumuman/baru">Buat Pengumuman</Link>
                </Button>
            </div>
            <TabelPengumuman/>
        </div>
    )
}