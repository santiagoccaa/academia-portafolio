import { TitlePage } from "@/components/Shared"
import { CalendarCheck, Rocket } from "lucide-react"

export const CoursesPage = () => {
    return (
        <div className="w-full p-4 space-y-4">
            <TitlePage
                icon={Rocket}
                title="Destacados"
            />
            <div>
                Cursos
            </div>

            <TitlePage
                icon={CalendarCheck}
                title="Añadidos reciente"
            />
        </div>
    )
}

