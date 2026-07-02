import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { AcademyService } from "./Services"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

export const CardServices = (service: AcademyService) => {
  const t = useTranslations('homePage.services')

  const { description, href, icon, title, color } = service

  return (
    <Card className="full hover:bg-secondary rounded-md shadow-lg hover:shadow-none group transition-colors duration-300">
      <CardTitle className="text-2xl font-bold flex px-6 items-center gap-2 text-gray-800 group-hover:text-white duration-300">
        <div className={`p-2 rounded-lg ${color} group-hover:bg-white transition-colors duration-300`}>
          {icon}
        </div>
        {t(`cards.${title}`)}
      </CardTitle>
      <CardContent className="text-base text-left text-gray-600 group-hover:text-white duration-300">
        {t(`cards.${description}`)}
      </CardContent>
      <CardFooter>
        <Link href={href} className="text-sm font-medium text-primary flex gap-2 items-center group-hover:text-white duration-300">
          {t('cards.link')} <ChevronRight size={15} className="group-hover:translate-x-1 duration-300 text-white" />
        </Link>
      </CardFooter>
    </Card>
  )
}
