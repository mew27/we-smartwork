import { Avatar, Button, IconButton, Typography } from '@mui/material';
import StyledButtonProps from './StyledButtonProps';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

interface AccountButtonProps extends StyledButtonProps {
    src : string
}

const AccountButton = ({size, src} : AccountButtonProps) => {
    if (size === "small") {
        return (<>
                <IconButton><Avatar src={src} sx={{width : 30, height : 30}}></Avatar></IconButton>
                    {/* <AccountCircleOutlinedIcon color="info"></AccountCircleOutlinedIcon> */}
            </>);
    } else {
        return (<>
                <Button color="info" variant="text">
                    <Typography noWrap variant="button" sx={{textDecoration: "underline"}}>
                        Michele Iuliano
                    </Typography>
                </Button>
            </>);
    }
}

export default AccountButton;