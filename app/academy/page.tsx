"use client"

import { CoursesPage } from "@/modules/Academy";
import { useAcademy } from "@/store";
import { CoursesCardHome } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Academy() {

  const { allCourses, getAllCourses } = useAcademy()

  useEffect(() => {

    if (allCourses.length > 0) return

    const getCourses = async () => {
      const allCourses = await axios.get('/api/courses')

      getAllCourses(allCourses.data)
    }

    getCourses()
  }, [])

  return <CoursesPage courses={allCourses} />
}
