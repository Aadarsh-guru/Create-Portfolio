import { NextRequest, NextResponse } from "next/server";
import ratelimit from "@/lib/ratelimit";

export default async function middleware(request: NextRequest) {
    try {
        const { success, message } = await ratelimit(request.ip ?? "127.0.0.1");
        if (!success) {
            return NextResponse.json({ message }, { status: 429 });
        };
    } catch (error) {
        console.log(error);
    };
    const hostname = request.headers.get("host");
    if (!hostname?.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)) {
        const searchParams = request.nextUrl.searchParams.toString();
        const path = `${request?.nextUrl?.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
        return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));
    };
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};