import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import * as bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs/promises';

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

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const username = formData.get('username') as string
        const password = formData.get('password') as string
        const nama = formData.get('nama') as string
        const avatar = formData.get('avatar') as File | null

        if (!username || !password || !nama) {
            return NextResponse.json({ error: "Missing required fields "}, { status: 400 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        let avatarPath = null
        if (avatar) {
            const uploadDir = path.join(process.cwd(), 'publlic/uploads/user-admin')

            // ensure the upload directory exists
            try {
                await fs.access(uploadDir)
            } catch {
                await fs.mkdir(uploadDir, {recursive: true});
            }

            const fileExtension = avatar.name.split('.').pop()
            const newFilename = `${Date.now()}-${username}.${fileExtension}`
            const filePath = path.join(uploadDir, newFilename)

            const arrayBuffer = await avatar.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            await fs.writeFile(filePath, buffer)

            avatarPath = `/uploads/admin/${newFilename}`
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                nama,
                avatar: avatarPath
            }
        })
        // Remove password from the response
        const { password: _, ...userWithoutPassword } = newUser

        return NextResponse.json(userWithoutPassword, { status: 201 })
    } catch (error) {
        console.error("Error creating user:", error)
        if (error instanceof Error && error.message.includes('Unique constraint failed on the fields: (`username`)')) {
            return NextResponse.json({ error: "Username already exists" }, { status: 400 })
        } else {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
        }
    }
}