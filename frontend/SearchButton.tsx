import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button, IconButton } from '@mui/material';
import StyledButtonProps from './StyledButtonProps';

const SearchButton = ({size, onClick} : StyledButtonProps) => {

    if (size === "small") {
        return (<>
                <IconButton onClick={onClick}>
                    <SearchOutlinedIcon color="info"></SearchOutlinedIcon>
                </IconButton>
            </>);
    } else {
        return (<>
                <Button onClick={onClick} sx={{width: '10em'}} endIcon={<SearchOutlinedIcon/>} color="info" variant="outlined">
                        Cerca...
                </Button>
            </>);
    }
};

export default SearchButton;