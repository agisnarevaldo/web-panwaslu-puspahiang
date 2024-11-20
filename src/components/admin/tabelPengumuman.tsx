"use client";

import {useEffect, useState} from "react";
// import {useRouter} from "next/navigation";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Eye, Pencil, Trash2} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import formatDate from "@/lib/formatDate";
import SkeletonTable from "@/components/ui/SkeletonTable";

interface Pengumuman {
    id: number;
    judul: string;
    content: string;
    tglDibuat: string;
    author: string;
    slug: string;
    lampiran: string;
}

export default function TabelPengumuman() {
    const [pengumuman, setPengumuman] = useState<Pengumuman[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const router = useRouter();

    useEffect(() => {
        fetchPengumuman();
    }, []);

    const fetchPengumuman = async () => {
        try {
            const response = await fetch('/api/pengumuman');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPengumuman(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pengumuman data:', error);
            setError('Failed to fetch data. please try again later');
            setLoading(false);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/pengumuman/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete pengumuman');
            }

            // remove the deleted item from the local state
            setPengumuman(pengumuman.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting pengumuman:', error);
            setError('Failed to delete pengumuman. Please try again later');
        }
    }

    if (error) {
        return <div className="text-red">{error}</div>
    }

    return (
        <div className="container mx-auto py-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Tanggal Dibuat</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <SkeletonTable
                            columns={4}
                            rows={4}
                            cellWidths={['100%', '20%', '20%', '20%']}
                        />
                    ) : (
                        pengumuman.map((item: Pengumuman) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.judul}</TableCell>
                                <TableCell>{item.author}</TableCell>
                                <TableCell>{formatDate(item.tglDibuat)}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link
                                                href={`../pengumuman/${item.slug}`}
                                                target="_blank"
                                            >
                                                <Eye className="h-4 w-4"/>
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`./pengumuman/edit/${item.id}`}>
                                                <Pencil className="h-4 w-4"/>
                                            </Link>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Apa anda benar-benar yakin?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini tidak dapat dibatalkan. Tindakan ini akan secara
                                                        permanen menghapus
                                                        pengumuman
                                                        dan menghapus data dari server kami.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(item.id)}>
                                                        Hapus
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}