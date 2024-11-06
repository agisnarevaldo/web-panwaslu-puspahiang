'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PPTPSForm() {
    const [formData, setFormData] = useState({
        namaLengkap: '',
        nik: '',
        tempatLahir: '',
        tanggalLahir: '',
        jenisKelamin: '',
        alamat: '',
        pendidikanTerakhir: '',
        noTelp: '',
        email: '',
        pekerjaan: '',
    })
    const [files, setFiles] = useState({
        suratPendaftaran: null,
        ktp: null,
        ijazah: null,
        daftarRiwayatHidup: null,
        suratPernyataan: null,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string) => (value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target
        if (files && files[0]) {
            setFiles(prev => ({ ...prev, [name]: files[0] }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formDataToSend = new FormData()

        // Append text fields
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value)
        })

        // Append files
        Object.entries(files).forEach(([key, file]) => {
            if (file) {
                formDataToSend.append(key, file)
            }
        })

        try {
            const response = await fetch('/api/pptps', {
                method: 'POST',
                body: formDataToSend,
            })

            if (!response.ok) {
                throw new Error('Failed to submit form')
            }

            router.push('/success') // Redirect to success page
        } catch (error) {
            console.error('Error submitting form:', error)
            setError('Terjadi kesalahan saat mengirim data. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Formulir PPTPS</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                        <Input id="namaLengkap" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nik">NIK</Label>
                        <Input id="nik" name="nik" value={formData.nik} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tempatLahir">Tempat Lahir</Label>
                        <Input id="tempatLahir" name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                        <Input id="tanggalLahir" name="tanggalLahir" type="date" value={formData.tanggalLahir} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                        <Select onValueChange={handleSelectChange('jenisKelamin')} value={formData.jenisKelamin}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                <SelectItem value="Perempuan">Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Textarea id="alamat" name="alamat" value={formData.alamat} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pendidikanTerakhir">Pendidikan Terakhir</Label>
                        <Input id="pendidikanTerakhir" name="pendidikanTerakhir" value={formData.pendidikanTerakhir} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="noTelp">No. Telepon</Label>
                        <Input id="noTelp" name="noTelp" value={formData.noTelp} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pekerjaan">Pekerjaan</Label>
                        <Input id="pekerjaan" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="suratPendaftaran">Surat Pendaftaran</Label>
                        <Input id="suratPendaftaran" name="suratPendaftaran" type="file" onChange={handleFileChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ktp">KTP</Label>
                        <Input id="ktp" name="ktp" type="file" onChange={handleFileChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ijazah">Ijazah</Label>
                        <Input id="ijazah" name="ijazah" type="file" onChange={handleFileChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="daftarRiwayatHidup">Daftar Riwayat Hidup</Label>
                        <Input id="daftarRiwayatHidup" name="daftarRiwayatHidup" type="file" onChange={handleFileChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="suratPernyataan">Surat Pernyataan</Label>
                        <Input id="suratPernyataan" name="suratPernyataan" type="file" onChange={handleFileChange} />
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
                        {loading ? 'Mengirim...' : 'Kirim'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}