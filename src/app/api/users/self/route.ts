import prismaClient from "@/lib/db"
import logger from "@/lib/logger"
import { UserNotFoundError, UserServiceImpl } from "@/services/userService"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextRequest, NextResponse } from "next/server"

export const GET = withApiAuthRequired(async (_req: NextRequest) => {
    const session = await getSession()
    const userService = new UserServiceImpl(prismaClient)
    
    try {
        const user = await userService.getAuthorizedUser(session!)
        return NextResponse.json(user)
    }
    catch(err) {
        logger.error(err)

        if(err instanceof UserNotFoundError) {
            return NextResponse.json(err, { status: 404 })
        }

        return NextResponse.json({ message: 'An unexpected error has occurred' }, {
            status: 500
        })
    }
})