import '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Palette {
        testColorType: Palette['primary']
    }

    interface PaletteOptions {
        testColorType?: PaletteOptions['primary']
    }
}

declare module '@mui/material/AppBar' {
    interface AppBarPropsColorOverrides {
        testColorType: true
    }
}