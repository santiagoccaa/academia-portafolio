"use client"

import { CoursesPage } from "@/modules/Academy";
import { CoursesCardHome } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Academy() {

  const [courses, setCourses] = useState<CoursesCardHome[] | []>([])

  useEffect(() => {
    const getAllCourses = async () => {
      const allCourses = await axios.get('/api/courses')

      setCourses(allCourses.data)
    }
    
    getAllCourses()
  }, [])

  return <CoursesPage courses={courses} />
}
