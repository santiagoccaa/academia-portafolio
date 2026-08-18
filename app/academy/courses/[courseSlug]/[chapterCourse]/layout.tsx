"use client"

import { ChaptersCourse } from "@/modules/Academy/ChapterPage/ChapterSelectect/components";
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { courseSlug } = useParams<{ courseSlug: string }>()

  return (
    <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-4">
      {children}
      <ChaptersCourse
        slug={courseSlug}
      />
    </div >
  );
}
