import { PrismaClient } from "@prisma/client";
import {NextResponse} from "next/server";

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