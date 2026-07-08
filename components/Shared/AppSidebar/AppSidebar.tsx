"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { CodeXml } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { routes, routesTeacher } from "./appSidebar.data"

export function AppSidebar() {

    const t = useTranslations('appSidebar')

    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="bg-white">
                <SidebarHeader>
                    <Link href={"/"} className="flex flex-row items-center gap-2">
                        <div className="p-1 rounded-full text-white bg-primary">
                            <CodeXml className="w-6 h-6" />
                        </div>
                        {
                            state === 'expanded' && <span className="text-xl font-semibold text-gray-800 tracking-wide">Academy</span>
                        }
                    </Link>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        {t('platform')}
                    </SidebarGroupLabel>
                    <SidebarMenu className="space-y-2">
                        {
                            routes.map((route) => (
                                <SidebarMenuItem key={route.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={route.url}>
                                            <div className="p-1 rounded-lg text-white bg-primary">
                                                <route.icon className="w-4 h-4" />
                                            </div>
                                            {state === "expanded" && <span>{t(route.title)}</span>}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                    <SidebarMenu className="mt-4 space-y-2">
                        <SidebarGroupLabel>
                            {t('teacher')}
                        </SidebarGroupLabel>
                        <SidebarMenuItem>
                            <SidebarMenuSub>
                                {
                                    routesTeacher.map((routeTeacher) => (
                                        <SidebarMenuSubItem key={routeTeacher.title}>
                                            <SidebarMenuSubButton className="hover:bg-muted transition" asChild>
                                                <Link href={routeTeacher.url}>
                                                    <div className="p-1 rounded-lg text-white bg-slate-400">
                                                        <routeTeacher.icon className="w-4 h-4" />
                                                    </div>
                                                    {t(routeTeacher.title)}
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))
                                }
                            </SidebarMenuSub>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent >
        </Sidebar >
    )
}