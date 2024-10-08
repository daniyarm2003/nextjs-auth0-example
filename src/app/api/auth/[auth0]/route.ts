import prismaClient from "@/lib/db";
import logger from "@/lib/logger";
import { AfterCallbackAppRoute, AppRouteHandlerFnContext, handleAuth, handleCallback, handleLogout } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

const afterCallback: AfterCallbackAppRoute = async (req, session, _state) => {
    const user = await prismaClient.user.upsert({
        where: {
            id: session.user.sub
        },
        update: {},
        create: {
            id: session.user.sub,
            email: session.user.email,
            name: session.user.name,
            iconUrl: session.user.picture,
            bio: 'I am a user!'
        }
    })

    logger.info({
        message: 'User logged in',
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
            return NextResponse.redirect(`${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&return_to=${process.env.AUTH0_BASE_URL}/api/auth/logout`)
        }
    }
})