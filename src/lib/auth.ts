"use server";

import { PrismaClient } from '@prisma/client';
import {cookies} from "next/headers";
// import bcrypt from 'bcryptjs';
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function authenticateUser(username: string, pasword: string) {
    const user = await prisma.user.findUnique({
        where: {
            username
        }, select: {
            id: true,
            username: true,
            password: true,
            nama: true,
            avatar: true
        }
    })

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(pasword, user.password);
    // const isPasswordValid = pasword === user.password;

    if (!isPasswordValid) {
        return null;
    }

    // Set a cookie to indicate the user is logged in
    cookies().set('user', JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    return { success: true };
}