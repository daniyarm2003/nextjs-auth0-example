import { Session } from "@auth0/nextjs-auth0"
import { User, PrismaClient } from "@prisma/client"

export class UserNotFoundError extends Error {

}

export interface UserService {
    getAuthorizedUser: (session: Session) => Promise<User>
    getOrCreateAuthorizedUser: (session: Session) => Promise<User>
    getAllUsers: () => Promise<User[]>
}

export class UserServiceImpl implements UserService {
    private prismaClient: PrismaClient
    
    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async getAuthorizedUser(session: Session) {
        const user = session.user
        const auth0Id = user.sub

        const dbUser = await this.prismaClient.user.findUnique({
            where: {
                auth0Id
            }
        })

        if(!dbUser) {
            throw new UserNotFoundError('No user database entry found for the authorized user')
        }

        return dbUser
    }

    public async getOrCreateAuthorizedUser(session: Session) {
        const user = session.user
        const auth0Id = user.sub

        return await this.prismaClient.user.upsert({
            where: {
                auth0Id
            },
            update: {},
            create: {
                auth0Id,
                name: user.name,
                email: user.email,
                iconUrl: user.picture,
                bio: 'I am a user!'
            }
        })
    }

    public async getAllUsers() {
        return await this.prismaClient.user.findMany()
    }
}