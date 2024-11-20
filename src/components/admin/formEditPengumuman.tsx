"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

interface Pengumuman {
    id: number;
    judul: string;
    isi: string;
    tglDibuat: string;
    author: string;
    lampiran: string;
}

export default function FormEditPengumuman({ id }: { id: number }) {
    const [pengumuman, setPengumuman] = useState<Pengumuman | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchPengumuman();
    }, []);

    const fetchPengumuman = async () => {
        try {
            const response = await fetch(`/api/pengumuman/${id}`);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/pengumuman/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pengumuman),
            })

            if (!response.ok) {
                throw new Error('Failed to update pengumuman');
            }

            router.push('/admin/pengumuman');
        } catch (error) {
            setError(`Failed to update pengumuman. ${error}`);
            console.error('Error updating pengumuman:', error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPengumuman(prev => prev ? {...prev, [name]: value} : null);
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    if (!pengumuman) {
        return <p>Data pengumuman tidak ditemukan</p>
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Pengumuman</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="judul">Judul</Label>
                        <Input
                            id="judul"
                            name="judul"
                            value={pengumuman.judul}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="isi">isi</Label>
                        <Textarea
                            id="isi"
                            name="isi"
                            value={pengumuman.isi}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            name="author"
                            value={pengumuman.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lampiran">Lampiran</Label>
                        <Input
                            id="lampiran"
                            name="lampiran"
                            value={pengumuman.lampiran}
                            onChange={handleChange}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        disabled={loading}>
                        {loading ? 'Loading...' : 'Update Pengumuman'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}