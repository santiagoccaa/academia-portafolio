import { ANALyTIC, CERTIFICATES, COURSES, MY_COURSES, ORDERS, TEACHER } from "@/const/routes";
import { Award, BookOpen, ChartArea, GraduationCap, ReceiptText, SquareTerminal } from "lucide-react";

export const routes = [
    {
        title: "courses",
        url: COURSES,
        icon: SquareTerminal
    },
    {
        title: "myCourses",
        url: MY_COURSES,
        icon: BookOpen
    },
    {
        title: "orders",
        url: ORDERS,
        icon: ReceiptText
    },
    {
        title: "certificates",
        url: CERTIFICATES,
        icon: Award
    },
]

export const routesTeacher = [
    {
        title: "courses",
        url: TEACHER,
        icon: GraduationCap
    },

    {
        title: "analytics",
        url: ANALyTIC,
        icon: ChartArea
    },
]