import { PrismaClient } from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import path from "path";
import {mkdir, stat, writeFile} from "node:fs/promises";
import mime from "mime";

const prisma = new PrismaClient();

export async function GET( req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        const anggota = await prisma.anggota.findUnique({
            where: {
                id: id
            }
        });

        if (!anggota) {
            return {
                status: 404,
                json: {
                    success: false,
                    message: "Anggota tidak ditemukan",
                }
            };
        }

        return NextResponse.json({
            success: true,
            message: "Berhasil mendapatkan data anggota",
            data: anggota
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching anggota:", error);
        return {
            status: 500,
            json: {
                success: false,
                message: "Internal Server Error"
            }
        };
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const formData = await req.formData();
        const nama = formData.get('nama') as string || '';
        const jabatan = formData.get('jabatan') as string || '';
        const periode = formData.get('periode') as string || '';
        const alamat = formData.get('alamat') as string || '';
        const noTelp = formData.get('noTelp') as string || '';
        const email = formData.get('email') as string || '';
        const divisi = formData.get('divisi') as string || '';
        const status = formData.get('status') as string || '';
        const photo = formData.get('photo') as File || null;

        let photoPath = null;
        if (photo) {
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
            // save photo to public/uploads/anggota
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
            const filename = `${photo.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(photo.type)}`;
            await writeFile(`${uploadDir}/${filename}`, buffer);
            const photoUrl = `${relativeUploadDir}/${filename}`;
            photoPath = photoUrl;
        }

        const anggota = await prisma.anggota.update({
            where: {
                id: params.id
            },
            data: {
                nama,
                jabatan,
                periode,
                alamat,
                noTelp,
                email,
                divisi,
                status,
                photo: photoPath,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Berhasil mengubah data anggota",
            data: anggota
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error updating anggota:", error);
        return {
            status: 500,
            json: {
                success: false,
                message: "Internal Server Error"
            }
        };
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const anggota = await prisma.anggota.delete({
            where: {
                id: params.id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Berhasil menghapus data anggota",
            data: anggota
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error deleting anggota:", error);
        return {
            status: 500,
            json: {
                success: false,
                message: "Internal Server Error"
            }
        };
    }
}