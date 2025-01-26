import { AppBar, Toolbar, Typography, useTheme, Box, Stack } from "@mui/material";

import useMediaQuery from '@mui/material/useMediaQuery';


import SearchButton from "./SearchButton"
import AccountButton from "./AccountButton";

import CandaLogo from "./CandaLogo";
import { Employee } from "../interface/db_schema";

interface WeSmartMenuProps {
    user : Employee | null,
    onClickSearch : () => void
}

const WeSmartMenu = ({user, onClickSearch} : WeSmartMenuProps) => {
    const theme       = useTheme();
    const isSmall     = useMediaQuery(theme.breakpoints.between('xs','sm'));
    const isLarge     = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isVeryLarge = useMediaQuery(theme.breakpoints.up('lg'));


    let CandALogoSize = isSmall ? 40 : 56

    return (<>
            <AppBar position='static' elevation={0}>
                <Toolbar>
                    <CandaLogo size = {CandALogoSize}></CandaLogo>
                    <Typography sx={{marginLeft: "0.6em"}} variant={isSmall ? 'h6' : "h4"} component='h1' color="secondary" fontWeight="bold">CandA</Typography>

                    {/* {isSmall ? (<IconButton><MenuIcon color="info"></MenuIcon></IconButton>) : (<></>)} */}
                    <Box sx={{flex: 1}} />
                    {user?
                        (
                        <Stack direction="row" spacing={2} alignItems="center">
                            <SearchButton onClick={onClickSearch} size={isSmall ? "small" : "large"}></SearchButton>
                            <AccountButton username={user?.name} src={""} size={(isLarge || isVeryLarge) ? "large" : "small"}></AccountButton>
                            {/* {!isSmall ? (<IconButton><MenuIcon color="info"></MenuIcon></IconButton>) : (<></>)} */}
                        </Stack>
                        )
                        :
                        null
                    }
                </Toolbar>
            </AppBar>
    </>);
}

export default WeSmartMenu;