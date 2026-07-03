import { AppSidebar } from "@/components/Shared/AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AcademyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <AppSidebar />
                {children}
            </SidebarProvider>
        </TooltipProvider>
    )
}