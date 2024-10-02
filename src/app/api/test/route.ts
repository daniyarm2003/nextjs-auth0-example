import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const headerMap: Record<string, string> = {}

    req.headers.forEach((value, key) => headerMap[key] = value)

    const body = {
        headers: headerMap,
        ip: req.ip,
        route: req.nextUrl
    }

    return NextResponse.json(body)
}