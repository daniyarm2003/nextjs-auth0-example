'use client'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

import { User } from '@prisma/client'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import Person from '@mui/icons-material/Person'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
    user: User,
    anchorElement?: HTMLElement,
    onClose: () => void
}

export default function NavbarProfileDisplayMenu({ user, anchorElement, onClose }: Props) {
    const open = Boolean(anchorElement)

    const [ menuWidth, setMenuWidth ] = useState<number>()

    useEffect(() => {
        if(anchorElement) {
            setMenuWidth(anchorElement?.offsetWidth)
        }
    }, [anchorElement])

    return (
        <Menu disableAutoFocusItem 
            open={open} 
            anchorEl={anchorElement} 
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} 
            onClose={onClose}
            MenuListProps={{ sx: { width: menuWidth } }}>
            <MenuItem component={Link} href={`/profile/${user.id}`}>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                Settings
            </MenuItem>
            <Divider />
            <MenuItem component='a' href='/api/auth/logout' sx={{ color: 'error.main' }}>
                <ListItemIcon>
                    <Logout color='error' />
                </ListItemIcon>
                Log Out
            </MenuItem>
        </Menu>
    )
}