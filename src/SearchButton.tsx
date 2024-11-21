import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, IconButton, Typography } from '@mui/material';
import StyledButtonProps from './StyledButtonProps';

const SearchButton = ({size} : StyledButtonProps) => {
    // const theme = useTheme();
    // const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    if (size === "small") {
        return (<>
                <IconButton>
                    <SearchOutlinedIcon color="info"></SearchOutlinedIcon>
                </IconButton>
            </>);
    } else {
        return (<>
                <Button sx={{width: '10em'}} endIcon={<SearchOutlinedIcon/>} color="info" variant="outlined">
                        Cerca...
                </Button>
            </>);
    }
};

export default SearchButton;