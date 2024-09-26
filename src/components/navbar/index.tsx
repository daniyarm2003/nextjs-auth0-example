import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'

export default function Navbar() {
    return (
        <AppBar position='sticky' color='success'>
            <Toolbar>
                <Button color='inherit' href='/test'>Test Page</Button>
            </Toolbar>
        </AppBar>
    )
}