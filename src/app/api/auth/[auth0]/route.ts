import prismaClient from "@/lib/db";
import logger from "@/lib/logger";
import { UserServiceImpl } from "@/services/userService";
import { AfterCallbackAppRoute, AppRouteHandlerFnContext, handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

const afterCallback: AfterCallbackAppRoute = async (_req, session, _state) => {
    const userService = new UserServiceImpl(prismaClient)
    const user = await userService.getOrCreateAuthorizedUser(session)

    logger.info({
        action: 'User logged in',
        user
    })

    return session
}

export const GET = handleAuth({
    async callback(req: NextRequest, ctx: AppRouteHandlerFnContext) {
        try {
            return await handleCallback(req, ctx, { afterCallback })
        }
        catch(err) {
            logger.error(err)

            const redirectBaseURI = `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout`
            const returnToURI = `${process.env.AUTH0_BASE_URL}/api/auth/logout`

            return NextResponse.redirect(`${redirectBaseURI}?client_id=${process.env.AUTH0_CLIENT_ID}&return_to=${returnToURI}`)
        }
    }
})