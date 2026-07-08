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
                <div className="w-full p-4">
                    {children}
                </div>
            </SidebarProvider>
        </TooltipProvider>
    )
}