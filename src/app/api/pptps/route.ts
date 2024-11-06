import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import path from "path";
import {writeFile} from "fs/promises";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // get all data pptps
        const pptps = await prisma.pPTPS.findMany({})

        // return response JSON
        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan data pptps",
                data: pptps
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
    try {
        const formData = await req.formData();

        const fileFields = ['suratPendaftaran', 'ktp', 'ijazah', 'daftarRiwayatHidup', 'suratPernyataan'];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: Record<string, any> = {};

        // @ts-expect-error formData has no entries
        for (const [key, value] of formData.entries()) {
            if (fileFields.includes(key) && value instanceof Blob) {
                const buffer = Buffer.from(await value.arrayBuffer());
                const filename = `${Date.now()}-${(value as File).name}`;
                const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'pptps');
                const filepath = path.join(uploadDir, filename);
                await writeFile(filepath, buffer);
                data[key] = `/uploads/pptps/${filename}`;
            } else {
                data[key] = value;
            }
        }

        // Convert tanggalLahir to Date object
        if (data.tanggalLahir) {
            data.tanggalLahir = new Date(data.tanggalLahir);
        }

        const pptps = await prisma.pPTPS.create({
            data: {
                namaLengkap: data.namaLengkap,
                nik: data.nik,
                tempatLahir: data.tempatLahir,
                TanggaLahir: data.tanggalLahir,
                jenisKelamin: data.jenisKelamin,
                alamat: data.alamat,
                pendidikanTerakhir: data.pendidikanTerakhir,
                noTelp: data.noTelp,
                email: data.email,
                pekerjaan: data.pekerjaan,
                suratPendaftaran: data.suratPendaftaran,
                ktp: data.ktp,
                ijazah: data.ijazah,
                daftarRiwayatHidup: data.daftarRiwayatHidup,
                suratPernyataan: data.suratPernyataan,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil membuat data PPTPS",
                data: pptps
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            { status: 500 }
        );
    }
}