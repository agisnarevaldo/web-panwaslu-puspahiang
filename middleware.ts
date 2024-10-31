import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('user')?.value

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!currentUser) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        try {
            JSON.parse(currentUser)
        } catch {
            // If the user cookie is invalid, clear it and redirect to login
            const response = NextResponse.redirect(new URL('/login', request.url))
            response.cookies.delete('user')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}