import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';

const SearchButton = () => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    if (isSmall) {
        return (<>
                <IconButton>
                    <SearchOutlinedIcon color="info"></SearchOutlinedIcon>
                </IconButton>
            </>);
    } else {
        return (<>
                <Button sx={{width: '10em', marginRight: '1.5em'}} endIcon={<SearchOutlinedIcon/>} color="info" variant="outlined">
                    Cerca...
                </Button>
            </>);
    }
};

export default SearchButton;