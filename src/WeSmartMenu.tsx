import { AppBar, IconButton, Toolbar, Button, Typography, useTheme, Container } from "@mui/material";

import mbda from './assets/MBDA-Logo.svg'
import useMediaQuery from '@mui/material/useMediaQuery';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import SearchButton from "./SearchButton"

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
                    {/* <Container sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <Typography variant='h4' component='h1' color="secondary" fontWeight="bold" sx={{position : "absolute"}}>WeSmartWork</Typography>
                    </Container>   */}
                    <Toolbar>
                        <Container sx={{display: 'flex', justifyContent: 'flex-start', alignContent: 'center'}}>
                            <Typography variant='h4' component='h1' color="secondary" fontWeight="bold">WeSmartWork</Typography>
                        </Container>
                        <IconButton><SearchOutlinedIcon color="info"></SearchOutlinedIcon></IconButton>
                        <IconButton><AccountCircleOutlinedIcon color="info"></AccountCircleOutlinedIcon></IconButton>
                        <IconButton><MenuIcon color="info"></MenuIcon></IconButton>
                    </Toolbar>
                </AppBar>
            </>
        );
    } else if (isMedium) {
        return (<>
                <AppBar position='static' elevation={0}>
                    <Toolbar>
                        <MenuIcon color="info"></MenuIcon>
                        <Container sx={{display: 'flex', justifyContent: 'left', alignContent: 'center'}}>
                            <Typography variant='h4' component='h1' color="secondary" fontWeight="bold">WeSmartWork</Typography>
                        </Container>
                        <SearchButton></SearchButton>
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