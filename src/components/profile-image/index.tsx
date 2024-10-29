import Avatar, { AvatarOwnProps, AvatarSlotsAndSlotProps } from '@mui/material/Avatar'
import { User } from '@prisma/client'

interface Props extends AvatarOwnProps, AvatarSlotsAndSlotProps {
    user: User
}

export default function ProfileImage({ user, sx, ...props }: Props) {
    const getAvatarInitials = () => {
        const [ firstName, lastName ] = user.name.split(' ')
        return `${firstName?.charAt(0)}${lastName?.charAt(0)}`
    }

    if(user.iconUrl) {
        return (
            <Avatar {...props} sx={sx} alt={user.name} src={user.iconUrl} imgProps={{ referrerPolicy: 'no-referrer' }} />
        )
    }
    
    return (
        <Avatar {...props} alt={user.name} sx={{ bgcolor: 'secondary.main', ...sx }}>{getAvatarInitials()}</Avatar>
    )
}