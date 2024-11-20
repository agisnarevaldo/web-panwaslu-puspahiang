import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
// import {IncomingForm} from "formidable";
import path from "path";
import {mkdir, stat, writeFile} from "node:fs/promises";
import mime from "mime";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const anggota = await prisma.anggota.findMany();

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan data user",
                data: anggota,
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

export const config = {
    api: {
        bodyParser: false,
    },
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const nama = formData.get('nama') as string || "";
    const jabatan = formData.get('jabatan') as string || "";
    const periode = formData.get('periode') as string || "";
    const alamat = formData.get('alamat') as string || "";
    const noTelp = formData.get('noTelp') as string || "";
    const email = formData.get('email') as string || "";
    const divisi = formData.get('divisi') as string || "";
    const status = formData.get('status') as string || "";
    const photo = formData.get('photo') as File || null;

    const buffer = Buffer.from(await photo.arrayBuffer());
    const relativeUploadDir = `/uploads/anggota/${nama.replace(/\s/g, "-")}`;

    const uploadDir = path.join(process.cwd(), 'public', relativeUploadDir);

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
                    status: 500,
                }
            )
        }
    }

    try {
        // save photo to public/uploads/anggota
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `${photo.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(photo.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const photoUrl = `${relativeUploadDir}/${filename}`;

        // save data to database
        const anggota = await prisma.anggota.create({
            data: {
                nama: nama,
                jabatan: jabatan,
                periode: periode,
                alamat: alamat,
                noTelp: noTelp,
                email: email,
                divisi: divisi,
                status: status,
                photo: photoUrl,
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil menambahkan anggota",
                data: anggota,
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