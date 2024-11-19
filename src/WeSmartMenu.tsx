import { AppBar, IconButton, Toolbar, Button, Typography, useTheme, Container } from "@mui/material";

import mbda from './assets/MBDA-Logo.svg'
import useMediaQuery from '@mui/material/useMediaQuery';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import SearchBar from "./SearchBar"

const WeSmartMenu = () => {
    const theme       = useTheme();
    const isSmall     = useMediaQuery(theme.breakpoints.between('xs','sm'));
    const isMedium    = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLarge     = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isVeryLarge = useMediaQuery(theme.breakpoints.up('lg'));


    if (isSmall) {
        return (
            <>
                <AppBar position='static' elevation={0}>
                    <Toolbar>
                        <MenuIcon color="info"></MenuIcon>
                        <Container sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                            <Typography variant='h4' component='h1' color="secondary" fontWeight="bold">WeSmartWork</Typography>
                        </Container>
                        <AccountCircleOutlinedIcon color="info"></AccountCircleOutlinedIcon>
                    </Toolbar>
                </AppBar>
            </>
        );
    } else if (isMedium) {
        return (<>
                <AppBar position='static' elevation={0}>
                    <Toolbar>
                        <MenuIcon color="info"></MenuIcon>
                        <Container sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                            <Typography variant='h4' component='h1' color="secondary" fontWeight="bold">WeSmartWork</Typography>
                        </Container>
                        <SearchBar></SearchBar>
                        <AccountCircleOutlinedIcon color="info"></AccountCircleOutlinedIcon>
                    </Toolbar>
                </AppBar>
        </>);
    } {
        return (
        <>
            <AppBar position='static' elevation={0}>
                <Toolbar>
                    Screen  isSmall?    {`${isSmall}`}<br/>
                    Screen  isMedium?   {`${isMedium}`} <br/>
                    Screen  isLarge?    {`${isLarge}`}<br/>
                    Scrrren isVeryLarge {`${isVeryLarge}`}
                    <IconButton>
                        <img src={mbda}></img>
                    </IconButton>
                    <Typography variant='h1' sx={{flexGrow : 1}}>WSMR SmartWorking</Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
        </>
        );
    }
}

export default WeSmartMenu;