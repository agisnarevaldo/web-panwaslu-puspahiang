import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const userCookie = request.cookies.get('user')?.value

    if (!userCookie) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        JSON.parse(userCookie) // Validate that the cookie contains valid JSON
        return NextResponse.next()
    } catch (error) {
        console.error('User cookie parsing failed:', error)
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('user')
        return response
    }
}

export const config = {
    matcher: ['/admin/:path*']
}