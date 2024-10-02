'use client'

import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import NavbarLink from './navbarLink'
import NavbarDesktopView from './desktop'
import NavbarMobileView from './mobile'

export default function Navbar() {
    const theme = useTheme()
    const desktopView = useMediaQuery(theme.breakpoints.up('md'))

    const links: NavbarLink[] = [
        { name: 'Home', link: '/', authorizedOnly: false },
        { name: 'About', link: '/', authorizedOnly: false },
        { name: 'Posts', link: '/', authorizedOnly: true }
    ]

    return (
        <AppBar position='sticky' color='primary'>
            <Toolbar>
                { desktopView ? (
                    <NavbarDesktopView links={links} />
                ) : (
                    <NavbarMobileView links={links} />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button color='inherit' href='/api/auth/login'>Log in/Sign Up</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}