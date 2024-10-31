import {Users, Home, Newspaper} from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import DialogExit from "@/components/admin/dialogExit";

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Kelola Berita",
        url: "#",
        icon: Newspaper,
    },
    {
        title: "Kelola Pendaftaran",
        url: "#",
        icon: Users,
    },
    // {
    //     title: "Search",
    //     url: "#",
    //     icon: Search,
    // },
    // {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings,
    // },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="border-b h-auto py-2 rounded-none">
                        <div className="flex gap-2 items-center">
                            <Image src="/icon.png" alt="logo" width={30} height={30}/>
                            <div>
                                <p className="font-bold">
                                    BAWASLU
                                </p>
                                <p className="text-[9px]">PANITIA PENGAWAS PEMILIHAN UMUM</p>
                                <p className="text-[10px]">
                                    KECAMATAN PUSPAHIANG
                                </p>
                            </div>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-4">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Sidebar footer.*/}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DialogExit/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
