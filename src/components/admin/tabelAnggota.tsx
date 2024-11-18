"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import SkeletonTable from "@/components/ui/SkeletonTable";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface AnggotaItem {
    id: string
    nama: string
    photo: string
    jabatan: string
    periode: string
    alamat: string
    email: string
}

export default function TabelAnggota() {
    const [anggota, setAnggota] = useState<AnggotaItem[]>([])
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAnggota()
    }, []);

    const fetchAnggota = async () => {
        try {
            const response = await fetch('/api/anggota')
            if (response.ok) {
                const data = await response.json()
                setAnggota(data.data)
                setLoading(false)
                console.log('Fetched anggota:', data)
            } else {
                console.error('Failed to fetch anggota')
            }
        } catch (error) {
            console.error('Error fetching anggota:', error)
        }
    }

    const handleEdit = (id: string) => {
        console.log(`Attempting to edit anggota with id: ${id}`)
        try {
            router.push(`/admin/profil/anggota/edit/${id}`)
        } catch (error) {
            console.error('Error navigating to edit page:', error)
            setError('Failed to navigate to edit page. Please try again.')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/anggota/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                fetchAnggota() // Refresh the anggota list
            } else {
                console.error('Failed to delete anggota')
            }
        } catch (error) {
            console.error('Error deleting anggota:', error)
        }
    }

    if (error) {
        return (
            <div className="text-red-500">{error}</div>
        )
    }

    return (
        <div className="container mx-auto py-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Jabatan</TableHead>
                        <TableHead>Periode</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Foto</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <SkeletonTable
                            rows={5}
                            columns={7}
                        />
                    ): (
                        anggota.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.nama}</TableCell>
                                <TableCell>{item.jabatan}</TableCell>
                                <TableCell>{item.periode}</TableCell>
                                <TableCell>{item.alamat}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <Image
                                            src={item.photo}
                                            alt={item.nama}
                                            width={50}
                                            height={50}
                                            objectFit="cover"
                                            className="rounded"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(item.id)}>
                                            <Pencil className="h-4 w-4"/>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the
                                                        news article.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(item.id)}>
                                                        Delete
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