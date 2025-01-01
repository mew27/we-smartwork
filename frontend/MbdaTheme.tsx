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
                main: 'rgb(255, 255, 255)'
            },
            secondary: {
                main: 'rgb(228, 0, 43)'
            },
            // info: {
            //     main: '#303030'
            // }
            info : {
                main : 'rgb(0, 20, 137)'
            }
        },
        typography: {
            fontFamily: 'Lato',
            fontSize: 16
        },
        shape: {
            borderRadius : 0
        }
    });

    theme = responsiveFontSizes(theme, {factor : 2});

    return (
        <>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
}
export default MbdaTheme;