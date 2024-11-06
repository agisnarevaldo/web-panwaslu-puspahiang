import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const pptps = await prisma.pPTPS.findUnique({
            where: {
                id: id
            }
        })

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

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const id = parseInt(params.id);
        const pptps = await prisma.pPTPS.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil menghapus data pptps",
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