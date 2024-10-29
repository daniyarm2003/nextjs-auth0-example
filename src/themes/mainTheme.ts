"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#5363A3'
        },
        secondary: {
            main: '#4443bc' //1B254E
        },
        background: {
            default: '#8091D8'
        }
    }
})

theme.typography.h1 = {
    fontSize: '4.0rem',
    marginTop: '10px',
    fontWeight: 'bolder',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem'
    }
}

theme.typography.h2 = {
    fontSize: '3.0rem',
    fontWeight: 'normal',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem'
    }
}

export default theme