import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button } from '@mui/material';

const SearchButton = () => {
    return (<>
        <Button sx={{width: '10em', marginRight: '1.5em'}} endIcon={<SearchOutlinedIcon/>} color="info" variant="outlined">
            Cerca...
        </Button>
    </>);
};

export default SearchButton;