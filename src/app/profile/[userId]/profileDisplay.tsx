import ProfileImage from "@/components/profile-image";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { User } from "@prisma/client";

interface Props {
    user: User
}

export default async function MainProfileDisplay({ user }: Props) {
    const avatarSize: SxProps<Theme> = {
        width: {
            xs: 150, md: 400
        },
        height: {
            xs: 150, md: 400
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: '10px' }}>
            <ProfileImage user={user} sx={{ ...avatarSize }} />
            <Typography variant='h2' component='h1'>{user.name}</Typography>
            <Typography variant='h4'>{user.email}</Typography>
            <Typography variant='h5' component='p'>{user.bio}</Typography>
        </Box>
    )
}