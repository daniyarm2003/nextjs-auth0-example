import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import NavbarLink from './navbarLink'
import NavbarDesktopView from './desktop'
import NavbarMobileView from './mobile'
import { getSession } from '@auth0/nextjs-auth0'
import { UserServiceImpl } from '@/services/userService'
import prismaClient from '@/lib/db'
import { User } from '@prisma/client'
import logger from '@/lib/logger'

export default async function Navbar() {
    const session = await getSession()
    const userService = new UserServiceImpl(prismaClient)

    let user: User | undefined = undefined

    if(session) {
        try {
            user = await userService.getAuthorizedUser(session)
        }
        catch(err) {
            logger.error(err)
        }
    }

    const links: NavbarLink[] = [
        { name: 'Home', link: '/', authorizedOnly: false },
        { name: 'About', link: '/', authorizedOnly: false },
        { name: 'Posts', link: '/', authorizedOnly: true }
    ]

    return (
        <AppBar position='sticky' color='primary'>
            <Toolbar>
                <Box sx={{ display: { xs: 'none', md: 'inherit' } }}>
                    <NavbarDesktopView links={links} user={user} />
                </Box>
                <Box sx={{ display: { xs: 'inherit', md: 'none' } }}>
                    <NavbarMobileView links={links} user={user} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    {user ? (
                        <Button color='inherit' href='/api/auth/logout'>Log Out</Button>
                    ) : (
                        <Button color='inherit' href='/api/auth/login'>Log In/Sign Up</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}