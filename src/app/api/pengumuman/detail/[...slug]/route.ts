import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}: { params: { slug: string } }) {
    try {
        const pengumuman = await prisma.pengumuman.findUnique({
            where: {
                slug: params.slug.toString()
            }
        });

        if (!pengumuman) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Pengumuman tidak ditemukan"
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan data pengumuman",
                data: pengumuman
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.error("Error fetching pengumuman:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {
                status: 500
            },
        );
    }
}