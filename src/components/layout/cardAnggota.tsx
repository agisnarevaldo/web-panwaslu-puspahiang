"use client";

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {MapPin, Briefcase, Calendar, Users, User} from 'lucide-react'
import {useState} from "react";

interface AnggotaCardProps {
    id: string
    nama: string
    jabatan: string
    periode: string
    alamat: string
    divisi?: string | null
    status?: string | null
    photo?: string | null
}

export function AnggotaCard({ nama, jabatan, periode, alamat, divisi, status, photo }: AnggotaCardProps) {
    const [imageError, setImageError] = useState(false)

    const handleImageError = () => {
        setImageError(true)
    }
    return (
        <Card className="w-full max-w-3xl h-max mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-1/2 aspect-square overflow-hidden group">
                    {photo && !imageError ? (
                        <Image
                            src={photo}
                            alt={`Foto ${nama}`}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-110 h-full"
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center">
                            {imageError ? (
                                <User className="w-20 h-20 text-background" />
                            ) : (
                                <span className="text-background text-6xl font-bold">{nama.charAt(0)}</span>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-between sm:w-max p-6">
                    <div>
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-2xl font-bold">{nama}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{jabatan}</p>
                        </CardHeader>
                        <CardContent className="px-0 py-4 space-y-4">
                            <div className="flex items-center space-x-2 text-sm">
                                <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="flex-1">{jabatan}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="flex-1">{periode}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="flex-1">{alamat}</span>
                            </div>
                            {divisi && (
                                <div className="flex items-center space-x-2 text-sm">
                                    <Users className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="flex-1">{divisi}</span>
                                </div>
                            )}
                        </CardContent>
                    </div>
                    <CardFooter className="px-0 pt-4 justify-end">
                        {status && (
                            <Badge variant="secondary" className="text-xs font-medium">
                                {status}
                            </Badge>
                        )}
                    </CardFooter>
                </div>
            </div>
        </Card>
    )
}