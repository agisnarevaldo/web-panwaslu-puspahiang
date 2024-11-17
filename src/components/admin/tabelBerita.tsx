'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Pencil, Trash2} from "lucide-react"
import formatDate from "@/lib/formatDate";
import SkeletonTable from "@/components/ui/SkeletonTable";

interface NewsItem {
    id: string
    judul: string
    author: string | null
    isi: string
    tglDibuat: string
}

export default function TabelBerita() {
    const [news, setNews] = useState<NewsItem[]>([])
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/berita')
            if (response.ok) {
                const data = await response.json()
                setNews(data.data)
                setLoading(false)
                console.log('Fetched news:', data)
            } else {
                console.error('Failed to fetch news')
            }
        } catch (error) {
            console.error('Error fetching news:', error)
        }
    }

    const handleEdit = (id: string) => {
        console.log(`Attempting to edit news with id: ${id}`)
        try {
            router.push(`/admin/berita/edit/${id}`)
        } catch (error) {
            console.error('Error navigating to edit page:', error)
            setError('Failed to navigate to edit page. Please try again.')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/berita/${id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                fetchNews() // Refresh the news list
            } else {
                console.error('Failed to delete news')
            }
        } catch (error) {
            console.error('Error deleting news:', error)
        }
    }

    if (error) {
        return (
            <div className="container mx-auto py-10">
                <p className="text-red-600">{error}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Judul</TableHead>
                        <TableHead>Penulis</TableHead>
                        <TableHead>Tanggal Publikasi</TableHead>
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
                        news.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.judul}</TableCell>
                                <TableCell>{item.author || 'Tidak Diketahui'}</TableCell>
                                <TableCell>{formatDate(item.tglDibuat)}</TableCell>
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