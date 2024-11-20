import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id)
        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 })
        }
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                nama: true,
                avatar: true
            },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error("Error fetching user:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const formData = await request.formData()
        const nama = formData.get('nama') as string
        const currentPassword = formData.get('currentPassword') as string
        const newPassword = formData.get('newPassword') as string
        const avatar = formData.get('avatar') as File | null

        const user = await prisma.user.findUnique({
            where: { id: params.id },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        if (currentPassword) {
            const passwordMatch = await bcrypt.compare(currentPassword, user.password)
            if (!passwordMatch) {
                return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
            }
        }

        let avatarPath = user.avatar
        if (avatar) {
            const uploadDir = path.join(process.cwd(), 'public/uploads/user-admin')
            const fileExtension = avatar.name.split('.').pop()
            const newFilename = `${Date.now()}-${user.username}.${fileExtension}`
            const filePath = path.join(uploadDir, newFilename)

            const arrayBuffer = await avatar.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            await fs.writeFile(filePath, buffer)

            avatarPath = `/uploads/admin/${newFilename}`

            // Delete old avatar if it exists
            if (user.avatar) {
                const oldAvatarPath = path.join(process.cwd(), 'public', user.avatar)
                await fs.unlink(oldAvatarPath).catch(() => {})
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                nama,
                avatar: avatarPath,
                ...(newPassword && { password: await bcrypt.hash(newPassword, 10) }),
            },
            select: { id: true, username: true, nama: true, avatar: true },
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error("Error updating user:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}