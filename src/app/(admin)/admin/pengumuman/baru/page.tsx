"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Loader2, Upload} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Page() {
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [author, setAuthor] = useState('');
    const [lampiran, setLampiran] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchAuthor() {
            try {
                const response = await fetch('/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setAuthor(data.author);
                }
            } catch (error) {
                console.error('Error fetching author:', error);
            }
        }
        fetchAuthor();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('isi', isi);
        formData.append('author', author);
        if (lampiran) {
            formData.append('lampiran', lampiran);
        }

        try {
            const response = await fetch('/api/pengumuman', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to post announcement');
            }

            setJudul('');
            setIsi('');
            setLampiran('');
            setAuthor('');

            router.push('/admin/pengumuman');
        } catch (error: Error | unknown) {
            setError(`Failed to post announcement: ${error instanceof Error ? error.message : 'Unknown error'}`);
            console.error('Error posting announcement:', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="container mx-auto mt-8">
            {/*<h1 className="text-2xl font-bold mb-4">Pengumuman Baru</h1>*/}
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Posting Pengumuman</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="judul">Judul</Label>
                            <Input
                                type="text"
                                id="judul"
                                name="judul"
                                value={judul}
                                onChange={e => setJudul(e.target.value)}
                                required
                                placeholder="Masukkan judul pengumuman"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="isi">Isi</Label>
                            <Textarea
                                id="isi"
                                name="isi"
                                value={isi}
                                onChange={e => setIsi(e.target.value)}
                                required
                                placeholder="Masukkan isi pengumuman"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lampiran">Lampiran</Label>
                            <Input
                                type="url"
                                id="lampiran"
                                name="lampiran"
                                onChange={e => setLampiran(e.target.value)}
                                placeholder="Masukkan URL lampiran"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="author">Penulis</Label>
                            <Input
                                type="text"
                                id="author"
                                name="author"
                                value={author}
                                onChange={e => setAuthor(e.target.value)}
                                placeholder="Masukkan nama penulis"
                                required
                            />
                        </div>
                        {error && (
                            <div className="text-red">{error}</div>
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
        </div>
    )
}