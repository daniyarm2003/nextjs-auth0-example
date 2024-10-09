'use client'

import NavbarLink from "./navbarLink"
import IconButton from '@mui/material/IconButton'
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from '@mui/material/MenuItem'
import { Claims } from "@auth0/nextjs-auth0"
import { User } from "@prisma/client"

interface Props {
    links: NavbarLink[],
    user?: User
}

export default function NavbarMobileView({ links, user }: Props) {
    const [ menuAnchorElement, setMenuAnchorElement ] = useState<HTMLElement>()
    const isMenuOpen = menuAnchorElement !== undefined

    const shouldDisplayLink = (link: NavbarLink) => {
        return !link.authorizedOnly || user !== undefined
    }

    return (
        <>
            <IconButton color='inherit' size='large' edge='start' onClick={e => setMenuAnchorElement(e.currentTarget)}>
                <MenuIcon />
            </IconButton>
            <Menu open={isMenuOpen} anchorEl={menuAnchorElement} onClose={() => setMenuAnchorElement(undefined)}>
                {links.filter(shouldDisplayLink).map(link => (
                    <MenuItem key={link.name} href={link.link}>{link.name}</MenuItem>
                ))}
            </Menu>
        </>
    )
}