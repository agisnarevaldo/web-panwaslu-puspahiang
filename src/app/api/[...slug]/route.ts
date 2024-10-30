// app/api/berita/[slug]/route.ts

import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const berita = await prisma.berita.findUnique({
            where: {
                slug: params.slug.toString()
            }
        });

        if (!berita) {
            return NextResponse.json({ message: 'Berita tidak ditemukan' }, { status: 404 });
        }

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan data berita",
                data: berita
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}