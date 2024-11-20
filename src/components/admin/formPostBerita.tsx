'use client'

import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {AlertCircle, Loader2, Upload} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FormPostBerita() {
    const [judul, setJudul] = useState('')
    const [isi, setIsi] = useState('')
    const [author, setAuthor] = useState('')
    // const [nama, setNama] = useState('')
    const [gambar, setGambar] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        // Fetch the username when the component mounts
        async function fetchUsername() {
            try {
                const response = await fetch('/api/user')
                if (response.ok) {
                    const data = await response.json()
                    setAuthor(data.author)
                    console.log(data.author);
                }
            } catch (error) {
                console.error('Error fetching username:', error)
            }
        }
        fetchUsername()
    }, [])

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
            const response = await fetch('/api/berita', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to post news')
            }

            // Clear the form
            setJudul('')
            setIsi('')
            setGambar(null)
            setAuthor('')

            router.push('/admin/berita') // Redirect to news list page
        } catch (error: Error | unknown) {
            setError(`Failed to post news: ${error instanceof Error ? error.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Posting Berita</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="judul">Judul</Label>
                        <Input
                            id="judul"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gambar">Gambar</Label>
                        <Input
                            id="gambar"
                            type="file"
                            accept="gambar/*"
                            onChange={(e) => setGambar(e.target.files?.[0] || null)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="isi">Kontent / Isi</Label>
                        <Textarea
                            id="isi"
                            value={isi}
                            onChange={(e) => setIsi(e.target.value)}
                            required
                            rows={5}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="author">Penulis</Label>
                        <Input
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Penulis (optional)"
                            required
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Posting...
                            </>
                        ) : (
                            'Posting'
                        )}
                        <Upload className="h-4 w-4"/>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}