import NavbarLink from "./navbarLink"
import { useUser } from "@auth0/nextjs-auth0/client"
import IconButton from '@mui/material/IconButton'
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from '@mui/material/MenuItem'

interface Props {
    links: NavbarLink[]
}

export default function NavbarMobileView({ links }: Props) {
    const { user } = useUser()

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