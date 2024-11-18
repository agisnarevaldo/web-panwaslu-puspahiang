"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle, Loader2, Upload} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function FormPostAnggota() {
    const [nama, setNama] = useState('')
    const [jabatan, setJabatan] = useState('')
    const [periode, setPeriode] = useState('')
    const [alamat, setAlamat] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('nama', nama)
        formData.append('jabatan', jabatan)
        formData.append('periode', periode)
        formData.append('alamat', alamat)
        formData.append('email', email)
        if (photo) {
            formData.append('photo', photo)
        }

        try {
            const response = await fetch('/api/anggota', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Failed to post news')
            }

            // Clear the form
            setNama('')
            setJabatan('')
            setPeriode('')
            setAlamat('')
            setEmail('')
            setPhoto(null)

            router.push('/admin/anggota') // Redirect to news list page
        } catch (error: Error | unknown) {
            setError(`Failed to post news: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Tambah Anggota</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nama">Nama</Label>
                        <Input
                            type="text"
                            id="nama"
                            value={nama}
                            onChange={e => setNama(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input
                            type="text"
                            id="jabatan"
                            value={jabatan}
                            onChange={e => setJabatan(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="periode">Periode</Label>
                        <Input
                            type="text"
                            id="periode"
                            value={periode}
                            onChange={e => setPeriode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            type="text"
                            id="alamat"
                            value={alamat}
                            onChange={e => setAlamat(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="photo">Foto</Label>
                        <Input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={e => setPhoto(e.target.files?.[0] || null)}
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
                                Prosess...
                            </>
                        ) : (
                            'Tambah'
                        )}
                        <Upload className="h-4 w-4"/>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}