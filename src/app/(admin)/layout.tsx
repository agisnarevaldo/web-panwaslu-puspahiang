import type {Metadata} from "next";
import localFont from "next/font/local";
import "../globals.css";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/admin/appSidebar";
import {CardDescription, CardTitle} from "@/components/ui/card";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Admin | Panwascam Puspahiang",
    description: "Panitia Pengawas Pemilihan Kecamatan Puspahiang",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const userCookie = cookies().get('user')

    if (!userCookie) {
        redirect('/')
    }

    let user
    try {
        user = JSON.parse(userCookie.value)
    } catch {
        redirect('/')
    }

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white  dark:bg-[#0a0a0a] text-[#171717] dark:text-[#ededed]`}
        >
            <SidebarProvider>
                <AppSidebar/>
                <main className="w-full">
                    <div className="flex border-b pr-1">
                        <SidebarTrigger />
                        <CardTitle className="text-center text-md font-semibold mx-auto">Dashboard</CardTitle>
                        <CardDescription>
                            {user && (
                                <>{user.nama}</>
                            )}
                        </CardDescription>
                    </div>
                    {children}
                </main>
            </SidebarProvider>
        </body>
        </html>
    );
}
