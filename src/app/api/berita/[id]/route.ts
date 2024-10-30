import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import { join } from "path";
import {mkdir, stat, writeFile} from "node:fs/promises";
import mime from "mime";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        // get data berita by id
        const berita = await prisma.berita.findUnique({
            where: {
                id: parseInt(params.id)
            }
        });

        // return response JSON
        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan data berita",
                data: berita
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await req.formData();
        const judul = formData.get("judul") as string || "";
        const isi = formData.get("isi") as string || "";
        const gambar = formData.get("gambar") as File || null;
        const author = formData.get("author") as string || "";
        const tglDibuat = formData.get("tglDibuat");

        let gambarPath = null;
        if (gambar) {
            const buffer = Buffer.from(await gambar.arrayBuffer());
            const relativeUploadDir = `/uploads/berita/${new Date(Date.now()).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
                .replace(/\//g, "-")
            }`;
            const uploadDir = join(process.cwd(), "public", relativeUploadDir);

            try {
                await stat(uploadDir);
            } catch (e: unknown) {
                if ((e as NodeJS.ErrnoException).code === "ENOENT") {
                    await mkdir(uploadDir, { recursive: true });
                } else {
                    console.error("Error saat membuat direktori | \t", e);
                    return NextResponse.json(
                        {
                            success: false,
                            message: "error saat membuat direktori:" + e,
                        },
                        {
                            status: 500
                        }
                    )
                }
            }
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const filename = `${gambar.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(gambar.type)}`;
            await writeFile(`${uploadDir}/${filename}`, buffer);
            gambarPath = `${relativeUploadDir}/${filename}`;
        }

        const berita = await prisma.berita.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                judul: judul,
                isi: isi,
                gambar: gambarPath,
                author: author,
                tglDibuat: new Date(tglDibuat as string),
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil update data berita",
                data: berita
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const berita = await prisma.berita.delete({
            where: {
                id: parseInt(params.id)
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil menghapus data berita",
                data: berita
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}