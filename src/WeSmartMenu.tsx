import { AppBar, IconButton, Toolbar, Button, Typography, useTheme, Container, SvgIcon, Box } from "@mui/material";

import mbda from './assets/MBDA-Logo.svg'
import useMediaQuery from '@mui/material/useMediaQuery';

import MenuIcon from '@mui/icons-material/Menu';

import SearchButton from "./SearchButton"
import AccountButton from "./AccountButton";

const WeSmartMenu = () => {
    const theme       = useTheme();
    const isSmall     = useMediaQuery(theme.breakpoints.between('xs','sm'));
    const isLarge     = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isVeryLarge = useMediaQuery(theme.breakpoints.up('lg'));

    return (<>
            <AppBar position='static' elevation={0}>
                <Toolbar sx={{display: "flex", justifyContent: "center"}}>
                    {isSmall ? (<IconButton><MenuIcon color="info"></MenuIcon></IconButton>) : (<></>)}
                    {(isVeryLarge) ? <img width="250px" src={mbda} />: <></>}
                    <Box sx={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography variant={isSmall ? 'h6' : "h4"} component='h1' color="secondary" fontWeight="bold">WeSmartWork</Typography>
                    </Box>
                    <SearchButton size={isSmall ? "small" : "large"}></SearchButton>
                    <AccountButton size={(isLarge || isVeryLarge) ? "large" : "small"}></AccountButton>
                    {!isSmall ? (<IconButton><MenuIcon color="info"></MenuIcon></IconButton>) : (<></>)}
                </Toolbar>
            </AppBar>
    </>);
}

export default WeSmartMenu;