'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
    namaLengkap: z.string().min(2, {
        message: "Nama lengkap harus diisi minimal 2 karakter.",
    }),
    nik: z.string().length(16, {
        message: "NIK harus terdiri dari 16 digit.",
    }),
    tempatLahir: z.string().optional(),
    tanggalLahir: z.string().optional(),
    jenisKelamin: z.enum(["Laki-laki", "Perempuan"]).optional(),
    alamat: z.string().optional(),
    pendidikanTerakhir: z.string().optional(),
    noTelp: z.string().optional(),
    email: z.string().email({
        message: "Email tidak valid.",
    }).optional(),
    pekerjaan: z.string().optional(),
    suratPendaftaran: z.any().optional(),
    ktp: z.any().optional(),
    ijazah: z.any().optional(),
    daftarRiwayatHidup: z.any().optional(),
    suratPernyataan: z.any().optional(),
})

export default function PPTPSForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const fileRefs = {
        suratPendaftaran: useRef<HTMLInputElement>(null),
        ktp: useRef<HTMLInputElement>(null),
        ijazah: useRef<HTMLInputElement>(null),
        daftarRiwayatHidup: useRef<HTMLInputElement>(null),
        suratPernyataan: useRef<HTMLInputElement>(null),
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            namaLengkap: "",
            nik: "",
            tempatLahir: "",
            tanggalLahir: "",
            jenisKelamin: undefined,
            alamat: "",
            pendidikanTerakhir: "",
            noTelp: "",
            email: "",
            pekerjaan: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        setError(null)

        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString())
            }
        })

        // Append file inputs
        Object.entries(fileRefs).forEach(([key, ref]) => {
            if (ref.current?.files?.[0]) {
                formData.append(key, ref.current.files[0])
            }
        })

        try {
            const response = await fetch('/api/pptps', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Gagal mengirim data')
            }

            router.push('/success') // Redirect to success page
        } catch (err: Error | unknown) {
            setError(`Gagal mengirim data PPTPS: ${err instanceof Error ? err.message : 'Unknown error'}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Formulir PPTPS</CardTitle>
                <CardDescription>Silakan isi formulir pendaftaran PPTPS di bawah ini.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        {/* Other form fields remain unchanged */}
                        {/* ... */}
                        <FormField
                            control={form.control}
                            name="namaLengkap"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Lengkap</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nik"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NIK</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tempatLahir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tempat Lahir</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tanggalLahir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Lahir</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jenisKelamin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Kelamin</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="alamat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pendidikanTerakhir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pendidikan Terakhir</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="noTelp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No. Telepon</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pekerjaan"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pekerjaan</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="suratPendaftaran"
                            render={({ field: { onChange, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Surat Pendaftaran</FormLabel>
                                    <FormControl>
                                        <Input type="file" onChange={(e) => onChange(e.target.files?.[0])} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ktp"
                            render={({ field: { onChange, ...field} }) => (
                                <FormItem>
                                    <FormLabel>KTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ijazah"
                            render={({ field: {onChange, ...field} }) => (
                                <FormItem>
                                    <FormLabel>Ijazah</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="daftarRiwayatHidup"
                            render={({ field: { onChange, ...field} }) => (
                                <FormItem>
                                    <FormLabel>KTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="suratPernyataan"
                            render={({ field: { onChange, ...field} }) => (
                                <FormItem>
                                    <FormLabel>Surat Pernyataan</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    Mengirim...
                                </>
                            ) : (
                                'Kirim'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}