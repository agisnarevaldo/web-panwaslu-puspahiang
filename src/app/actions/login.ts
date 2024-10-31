'use server';

import { authenticateUser} from "@/lib/auth";

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return {
            ...prevState,
            error: 'Username dan password harus diisi',
        };
    }

    const user = await authenticateUser(username, password);

    if (!user) {
        return {
            ...prevState,
            error: 'Username atau password salah',
        };
    }

    return { success: true };
}