import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import mime from "mime";
import {mkdir, stat, writeFile} from "node:fs/promises";
import {join} from "path";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // get all data berita
        const berita = await prisma.berita.findMany();

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

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const judul = formData.get("judul") as string || "";
    const isi = formData.get("isi") as string || "";
    const gambar = formData.get("gambar") as File || null;
    const author = formData.get("author") as string || "";
    const tglDibuat = formData.get("tglDibuat");

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
            await mkdir(uploadDir, {recursive: true});
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

    try {
        // save image to public/uploads/berita
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `${gambar.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(gambar.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;

        // save data to database
        const berita = await prisma.berita.create({
            data: {
                judul: judul,
                isi: isi,
                gambar: fileUrl,
                author: author,
                tglDibuat: new Date(tglDibuat as string),
            }
        });

        // return response JSON
        return NextResponse.json(
            {
                success: true,
                message: "Berhasil menyimpan data",
                data: berita
            },
            {
                status: 200,
            }
        )
    } catch (e) {
        console.error("Error saat menyimpan data | \t", e);
        return NextResponse.json(
            {
                success: false,
                message: "error saat menyimpan data:" + e,
            },
            {
                status: 500
            }
        )
    }
}