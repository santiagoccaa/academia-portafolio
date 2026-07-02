import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { IoLogoLinkedin, IoLogoTwitter } from "react-icons/io"

export interface TutorProps {
    name: string
    job: string
    description: string
    image: string
}

export const CardTutor = (infoTutor: TutorProps) => {
    const { description, job, name, image } = infoTutor

    return (
        <Card className="text-center rounded-xs bg-[#F9FAFB] shadow-md border-[#F9FAFB] w-60 h-full">
            <CardHeader>
                <div className="w-full flex justify-center" >
                    <div className="relative w-17 aspect-square rounded-full">
                        <Image src={`/persons/${image}.png`} fill alt={name} />
                    </div>
                </div>
                <h3 className="text-sm font-bold text-gray-800">{name}</h3>
                <span className="text-primary text-sm font-medium">{job}</span>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-gray-600 font-light">{description}</p>
            </CardContent>
            <CardFooter className="flex justify-center gap-2">
                <IoLogoTwitter strokeWidth={1} color="gray" />
                <IoLogoLinkedin strokeWidth={1} color="gray" />
            </CardFooter>
        </Card>
    )
}
