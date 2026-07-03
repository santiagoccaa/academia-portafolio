import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

interface TitlePageProps {
    title: string
    icon: LucideIcon
    children?: ReactNode
}

export const TitlePage = ({ title, icon: Icon, children }: TitlePageProps) => {
    return (
        <div className="w-full p-2 justify-between border rounded-md shadow">
            <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-primary text-white">
                    <Icon />
                </span>
                <h1 className="font-bold text-xl">{title}</h1>
            </div>

            <div>
                {children}
            </div>
        </div>
    )
}

