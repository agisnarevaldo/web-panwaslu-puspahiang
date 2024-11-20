import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const userCookie = cookies().get('user')

    if (!userCookie) {
        return NextResponse.json({message: "User not Authenticated"}, {status: 401});
    }

    try {
        const user = JSON.parse(userCookie.value)
        return NextResponse.json({ author: user.nama }, {status: 200});
    } catch {
        console.error('Error parsing user cookie:')
        return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
    }
}