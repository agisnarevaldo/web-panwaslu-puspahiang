import {Users, Home, Newspaper, ChevronDown, ChevronRight} from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Image from "next/image";
import DialogExit from "@/components/admin/dialogExit";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@radix-ui/react-collapsible";


const menuItems = [
    { icon: Home, label: 'Home', href: '/admin' },
    {
        icon: Newspaper,
        label: 'Berita',
        submenu: [
            { label: 'Buat Berita', href: '/admin/berita/baru' },
            { label: 'Data Berita', href: '/admin/berita/' },
        ]
    },
    {
        icon: Users,
        label: 'Pengumuman',
        submenu: [
            { label: 'Buat Pengumuman', href: '/admin/pengumuman/baru' },
            { label: 'Data Pengumuman', href: '/admin/pengumuman' },
        ]
    },
    {
        icon: Users,
        label: 'Pendafataran',
        submenu: [
            { label: 'Buat Pendaftaran', href: '/admin/pendaftaran/baru' },
            { label: 'Data Pendaftaran', href: '/admin/pendagtaran' },
        ]
    },
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
                            {menuItems.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    {item.submenu ? (
                                        <Collapsible defaultOpen className="group/collapsible">
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton>
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    {item.label}
                                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <SidebarMenuSubItem key={subIndex}>
                                                                <a href={subItem.href} className="flex items-center">
                                                                    <ChevronRight className="mr-2 h-3 w-3" />
                                                                    {subItem.label}
                                                                </a>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton asChild>
                                            <a href={item.href}>
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.label}
                                            </a>
                                        </SidebarMenuButton>
                                    )}
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
