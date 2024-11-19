import { styled, useTheme } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, Typography } from '@mui/material';

const SearchBar = () => {
    return (<>
        <Button sx={{width: '10em', marginRight: '1.5em'}} startIcon={<SearchOutlinedIcon/>} color="info" variant="outlined">
            Cerca...
        </Button>
    </>);
};

export default SearchBar;