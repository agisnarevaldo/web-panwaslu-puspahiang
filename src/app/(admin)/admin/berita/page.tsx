// import FormPostBerita from "@/components/admin/formPostBerita";
import TabelBerita from "@/components/admin/tabelBerita";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Data Berita</h1>
                <Button asChild>
                    <Link href="./berita/baru">Tambah Data</Link>
                </Button>
            </div>
            <TabelBerita />
        </div>
    )
}