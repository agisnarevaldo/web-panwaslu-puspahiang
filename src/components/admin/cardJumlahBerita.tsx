import { PrismaClient } from '@prisma/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper } from "lucide-react"

const prisma = new PrismaClient()

async function getNewsCount() {
    const count = await prisma.berita.count()
    return count
}

export default async function CardJumlahBerita() {
    const newsCount = await getNewsCount()

    return (
        <Card className="w-max">
            <CardHeader className="flex flex-row gap-2 items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">Jumlah Berita</CardTitle>
                <Newspaper className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-5xl font-bold flex items-center justify-between">
                    {newsCount}
                </div>
                <p className="text-xs text-muted-foreground">Berita DI Publikasikan</p>
            </CardContent>
        </Card>
    )
}