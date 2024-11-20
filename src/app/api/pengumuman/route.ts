import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // get all data pengumuman
        const pengumuman = await prisma.pengumuman.findMany({
            select: {
                id: true,
                judul: true,
                isi: true,
                author: true,
                tglDibuat: true,
                slug: true,
                lampiran: true,
            },
            orderBy: {
                tglDibuat: "desc",
            }
        });

        // return response JSON
        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan data pengumuman",
                data: pengumuman
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message: "Internal Server Error"}), {status: 500});
    }
}

// create slug must be unique
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

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const judul = formData.get("judul") as string || "";
        const isi = formData.get("isi") as string || "";
        const author = formData.get("author") as string || "";
        const lampiran = formData.get("lampiran") as string || "";
        const slug = await createSlug(judul);

        const pengumuan = await prisma.pengumuman.create({
            data: {
                judul,
                isi,
                author,
                tglDibuat: new Date(),
                slug,
                lampiran,
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil menambahkan pengumuman",
                data: pengumuan,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({message: "Internal Server Error"}), {status: 500});
    }
}