import style from './navbar.module.css'

import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function Navbar() {
    return (
        <AppBar position='sticky' color='primary'>
            <Toolbar>
                <Button color='inherit' href='/' className={style['nav-link-button']}>Home</Button>
                <Button color='inherit' href='/' className={style['nav-link-button']}>About</Button>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button color='inherit'>Log in/Sign Up</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}