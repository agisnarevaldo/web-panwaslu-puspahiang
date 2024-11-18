"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {AlertCircle, ArrowLeft, Loader2} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface Anggota {
    id: string;
    nama: string;
    jabatan: string;
    periode: string;
    alamat: string;
    noTelp: string;
    email: string;
    divisi: string;
    status: string;
    photo: string | null;
}

export default function FormEditAnggota({ id }: { id: string}) {
    const [anggota, setAnggota] = useState<Anggota | null>(null);
    const [nama, setNama] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [periode, setPeriode] = useState("");
    const [alamat, setAlamat] = useState("");
    const [noTelp, setNoTelp] = useState("");
    const [email, setEmail] = useState("");
    const [divisi, setDivisi] = useState("");
    const [status, setStatus] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAnggota = async () => {
            try {
                const response = await fetch(`/api/anggota/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setAnggota(data);
                    setNama(data.data.nama);
                    setJabatan(data.data.jabatan);
                    setPeriode(data.data.periode);
                    setAlamat(data.data.alamat);
                    setNoTelp(data.data.noTelp);
                    setEmail(data.data.email);
                    setDivisi(data.data.divisi);
                    setStatus(data.data.status);
                    console.log('Fetched Anggota:', data);
                } else {
                    setError('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchAnggota();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('jabatan', jabatan);
        formData.append('periode', periode);
        formData.append('alamat', alamat);
        formData.append('noTelp', noTelp);
        formData.append('email', email);
        formData.append('divisi', divisi);
        formData.append('status', status);

        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const response = await fetch(`/api/anggota/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response) {
                throw new Error('Failed to update user');
            }

            router.push('/profil/admin/anggota');
        } catch (error) {
            setError(`Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    }

    if (!anggota) {
        return <p>Loading...</p>;
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center">
                <Link
                    href="/admin/profil/anggota"
                    className="flex-initial hover:bg-gray-100 p-1 rounded-md"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <CardTitle
                    className="flex-1 text-center"
                >
                    Edit Profil Anggota
                </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nama">Nama</Label>
                        <Input
                            id="nama"
                            value={nama}
                            onChange={e => setNama(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input
                            id="jabatan"
                            value={jabatan}
                            onChange={e => setJabatan(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="periode">Periode</Label>
                        <Input
                            id="periode"
                            value={periode}
                            onChange={e => setPeriode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            id="alamat"
                            value={alamat}
                            onChange={e => setAlamat(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="noTelp">No. Telp</Label>
                        <Input
                            id="noTelp"
                            value={noTelp}
                            onChange={e => setNoTelp(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="divisi">Divisi</Label>
                        <Input
                            id="divisi"
                            value={divisi}
                            onChange={e => setDivisi(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Input
                            id="status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="photo">Photo</Label>
                        <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={e => setPhoto(e.target.files?.[0] || null)}
                        />
                        {anggota.photo && (
                            <p className="text-sm text-muted-foreground">Current photo: {anggota.photo}</p>
                        )}
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
                                Memperbarui Data...
                            </>
                        ) : (
                            'Simpan Perubahan'
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}