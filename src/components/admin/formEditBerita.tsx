"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";

interface Berita {
    id: number
    judul: string
    isi: string
    author: string
    gambar: string | null
    tgldibuat: string
}

export default function FormEditBerita({id}: {id: string}) {
    const [berita, setBerita] = useState<Berita | null>(null)
    const [judul, setJudul] = useState('')
    const [isi, setIsi] = useState('')
    const [author, setAuthor] = useState('')
    const [gambar, setGambar] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchBerita = async () => {
            try {
                const response = await fetch(`/api/berita/${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setBerita(data)
                    setJudul(data.data.judul)
                    setIsi(data.data.isi)
                    setAuthor(data.data.author)
                    console.log('Fetched news:', data)
                } else {
                    setError('Failed to fetch news')
                }
            } catch (error) {
                console.error('Error fetching news:', error)
            }
        }
        fetchBerita()
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('judul', judul)
        formData.append('isi', isi)
        formData.append('author', author)
        if (gambar) {
            formData.append('gambar', gambar)
        }

        try {
            const response = await fetch('/api/berita/${id}', {
                method: 'PUT',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to update news')
            }

            router.push('/admin/berita') // Redirect to news list page
        } catch (error) {
            setError(`Failed to update news: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    if (!berita) {
        return <div>Loading...</div>
    }
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Berita</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="judul">Title</Label>
                        <Input
                            id="judul"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gambar">Image</Label>
                        <Input
                            id="gambar"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setGambar(e.target.files?.[0] || null)}
                        />
                        {berita.gambar && (
                            <p className="text-sm text-muted-foreground">Current image: {berita.gambar}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="isi">Content</Label>
                        <Textarea
                            id="isi"
                            value={isi}
                            onChange={(e) => setIsi(e.target.value)}
                            required
                            rows={5}
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            'Update News'
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}