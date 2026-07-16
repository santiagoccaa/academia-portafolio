import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { CardCourse, TitlePage } from "@/components/Shared"
import { CoursesCardHome } from "@/types"
import { CalendarCheck, Rocket } from "lucide-react"

interface CoursesPageProps {
    courses: CoursesCardHome[]
}
export const CoursesPage = ({ courses }: CoursesPageProps) => {

    return (
        <div className="w-full space-y-4">
            <TitlePage
                icon={Rocket}
                title="Destacados"  
            />

            <Carousel>
                <CarouselContent className="p-2">
                    {courses.map((course) => (
                        <CarouselItem className="basis-1/3" key={course.id}>
                            <CardCourse {...course} />
                        </CarouselItem>
                    ))}
                    
                </CarouselContent>

                <div className="w-full flex py-4 justify-center gap-9">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>

            <TitlePage
                icon={CalendarCheck}
                title="Añadidos reciente"
            />
        </div>
    )
}

