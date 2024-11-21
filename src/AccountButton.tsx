import { Button, IconButton, Typography } from '@mui/material';
import StyledButtonProps from './StyledButtonProps';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const AccountButton = ({size} : StyledButtonProps) => {
    if (size === "small") {
        return (<>
                <IconButton>
                    <AccountCircleOutlinedIcon color="info"></AccountCircleOutlinedIcon>
                </IconButton>
            </>);
    } else {
        return (<>
                <Button sx={{minWidth: '15em'}} color="info" variant="text">
                    <Typography noWrap variant="button" sx={{textDecoration: "underline"}}>
                        Domenico Borzacchiello
                    </Typography>
                </Button>
            </>);
    }
}

export default AccountButton;