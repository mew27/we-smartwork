import { Avatar, Button, IconButton, Typography } from '@mui/material';
import StyledButtonProps from './StyledButtonProps';

interface AccountButtonProps extends StyledButtonProps {
    src : string,
    username : string
}

const AccountButton = ({size, src, username} : AccountButtonProps) => {

    if (size === "small") {
        return (<>
                <IconButton><Avatar src={src} sx={{width : 30, height : 30}}></Avatar></IconButton>
                    {/* <AccountCircleOutlinedIcon color="info"></AccountCircleOutlinedIcon> */}
            </>);
    } else {
        return (<>
                <Button color="info" variant="text">
                    <Typography noWrap variant="button" sx={{textDecoration: "underline"}}>
                        {username}
                    </Typography>
                </Button>
            </>);
    }
}

export default AccountButton;