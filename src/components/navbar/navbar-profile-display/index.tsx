'use client'

import Stack from '@mui/material/Stack'
import { User } from '@prisma/client'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { SxProps, Theme } from '@mui/material'
import { MouseEventHandler, useState } from 'react'
import NavbarProfileDisplayMenu from './menu'

interface Props {
    user: User
}

export default function NavbarProfileDisplay({ user }: Props) {
    const [ menuAnchorElement, setMenuAnchorElement ] = useState<HTMLElement>()

    const getAvatarInitials = (name: string) => {
        const [ firstName, lastName ] = name.split(' ')
        return `${firstName?.charAt(0)}${lastName?.charAt(0)}`
    }

    const hoverStyle: SxProps<Theme> = {
        '&:hover': {
            scale: 1.05,
            cursor: 'pointer'
        }
    }

    const avatarSize: SxProps<Theme> = {
        width: {
            xs: 30, md: 40
        },
        height: {
            xs: 30, md: 40
        }
    }

    const handleClick: MouseEventHandler<HTMLElement> = e => {
        setMenuAnchorElement(e.currentTarget)
    }

    const handleMenuClose = () => {
        setMenuAnchorElement(undefined)
    }

    return (
        <>
            <Stack direction='row' sx={[{ textAlign: 'left', p: '5px', transition: '0.25s linear' }, hoverStyle]} spacing={1} onClick={handleClick}>
                {user.iconUrl ? (
                    <Avatar alt={user.name} src={user.iconUrl} imgProps={{ referrerPolicy: 'no-referrer' }} sx={{ ...avatarSize }} />
                ) : (
                    <Avatar sx={{ bgcolor: 'secondary.main', ...avatarSize }} alt={user.name}>{getAvatarInitials(user.name)}</Avatar>
                )}
                <Stack direction='column' justifyContent='center'>
                    <Typography variant='body1' sx={{ fontSize: { xs: '0.65em', md: '1em' } }}>{user.name}</Typography>
                    <Typography variant='body2' sx={{ fontSize: { xs: '0.65em', md: '1em' } }}>{user.email}</Typography>
                </Stack>
            </Stack>
            <NavbarProfileDisplayMenu user={user} anchorElement={menuAnchorElement} onClose={handleMenuClose} />
        </>
    )
}