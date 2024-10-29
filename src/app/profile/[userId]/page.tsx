import prismaClient from "@/lib/db";
import { UserServiceImpl } from "@/services/userService";
import { Container, Typography } from "@mui/material";
import MainProfileDisplay from "./profileDisplay";

interface Props {
    params: {
        userId: Promise<string>
    }
}

export default async function ProfilePage({ params }: Props) {
    const userId = await params.userId
    const userService = new UserServiceImpl(prismaClient)

    const profileUser = await userService.getUserById(userId)

    return (
        <Container className='app-content'>
            {profileUser ? (
                <MainProfileDisplay user={profileUser} />
            ) : (
                <Typography variant='h1'>This user profile was not found</Typography>
            )}
        </Container>
    )
}