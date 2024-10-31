import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mendapatkan data user",
                data: users,
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

        const username = formData.get('username') as string || '';
        const password = formData.get('password') as string || '';
        const nama = formData.get('nama') as string || '';

        if (!username || !password) {
            return new Response(JSON.stringify({message: "Username dan password harus diisi"}), {status: 400});
        }

        const user = await prisma.user.create({
            data: {
                username,
                password,
                nama,
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil menambahkan user",
                data: user,
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