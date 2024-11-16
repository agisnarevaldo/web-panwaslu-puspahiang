import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid ID format",
                },
                {
                    status: 400,
                }
            );
        }

        const pengumuman = await prisma.pengumuman.findUnique({
            where: {
                id
            }
        });

        if (!pengumuman) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Pengumuman tidak ditemukan",
                },
                {
                    status: 404,
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
                status: 200,
            }
        );
    }
    catch (error) {
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

async function createSlug(title: string) {
    let slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    let i = 1;
    let exist = true;
    while (exist) {
        const checkSlug = await prisma.pengumuman.findFirst({
            where: {
                slug: slug
            }
        });
        if (checkSlug) {
            slug = `${slug}-${i}`;
            i++;
        } else {
            exist = false;
        }
    }
    return slug;
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();

        const updatedPengumuman = await prisma.pengumuman.update({
            where: { id },
            data: {
                judul: body.judul,
                isi: body.isi,
                author: body.author,
                lampiran: body.lampiran,
                slug: await createSlug(body.judul),
                tglDibuat: new Date(),
            },
        })

        return NextResponse.json(updatedPengumuman)
    } catch (error) {
        console.error("Error updating pengumuman:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        );
    }
}