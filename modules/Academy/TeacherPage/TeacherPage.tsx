import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { TitlePage } from "@/components/Shared"
import { Plus, UserPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseCard, FormCreateCourse } from "./components"
import { Course } from "@/app/generated/prisma/client"

interface CourseListProps {
    courses: Course[];
}

export const TeacherPage = ({ courses }: CourseListProps) => {

    return (
        <div className="w-full space-y-4">
            <TitlePage
                icon={UserPen}
                title="Profesores"
            >
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus /> Crear curso
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Crear curso</DialogTitle>
                            <FormCreateCourse />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </TitlePage>
            {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
            ))}
        </div>
    )
}

