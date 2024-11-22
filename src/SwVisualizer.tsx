import { Paper, Stack, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const SwVisualizer = () => {
    const numAccounts = 5

    return (<>
        <Paper elevation={0}>
            <Stack>
                <Typography variant="h5" component="h1">Controls & Automations</Typography>
                <Stack direction="row" spacing={-1}>
                    {[...Array(numAccounts).keys()].map((v) => <AccountCircleIcon sx={{zIindex: v, border: "3px solid white"}} fontSize="small" key={v}></AccountCircleIcon>)}
                    <Typography sx={{zIndex: numAccounts}}>+10 altri</Typography>
                </Stack>
            </Stack>
        </Paper>
    </>);
}

export default SwVisualizer;