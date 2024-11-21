import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";

import React from 'react';

const MbdaTheme = ({children} : React.PropsWithChildren) => {
    let theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#ffffff'
            },
            secondary: {
                main: '#e4002b'
            },
            // info: {
            //     main: '#303030'
            // }
            info : {
                main : '#001489'
            }
        },
        typography: {
            fontFamily: 'Lato',
            fontSize: 18
        },
        shape: {
            borderRadius : 0
        }
    });

    theme = responsiveFontSizes(theme, {factor : 1.8});

    return (
        <>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
}
export default MbdaTheme;