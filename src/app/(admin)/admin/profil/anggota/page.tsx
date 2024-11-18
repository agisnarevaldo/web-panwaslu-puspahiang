import {Button} from "@/components/ui/button";
import Link from "next/link";
import TabelAnggota from "@/components/admin/tabelAnggota";

export default function Page() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Data Profil Anggota</h1>
                <Button asChild>
                    <Link href="./anggota/baru">Tambah Data</Link>
                </Button>
            </div>
            <TabelAnggota />
        </div>
    )
}