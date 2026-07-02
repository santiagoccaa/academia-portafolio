'use server';

import { COOKIE_SITE_LANGUAGE } from "@/const/cookies/cookies";
import { cookies } from "next/headers";

export default async function getLangCookie() {
    const cookie = await cookies();
    return cookie.get(COOKIE_SITE_LANGUAGE)?.value;
}
