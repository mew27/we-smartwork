import { Paper, Stack, Typography, Avatar, Button, Divider, Box } from "@mui/material";

const SwVisualizer = () => {
    const numAccounts = 5

    return (<>
        <Paper elevation={0}>
            <Stack>
                <Typography  sx={{display: "flex", justifyContent: "center", alignContent: "center"}} component="h1" variant="h5" color="secondary">Controls & Automations</Typography>
                <Box sx={{display:"flex", justifyContent: "center"}}><Divider sx={{marginTop: '1em', marginBottom: '1em', width: "85%"}}></Divider></Box>
                <Stack direction="row" spacing={-1} sx={{display:"flex", justifyContent: "flex-end"}}>
                    {[...Array(numAccounts).keys()].map((v) => <Avatar sx={{width : 30, height : 30}} src={`src/assets/account_icons/Account_${v + 2}.jpg`} key={v}></Avatar>)}
                    <Button color="info">{`+${numAccounts} altri`}</Button>
                </Stack>
            </Stack>
        </Paper>
    </>);
}

export default SwVisualizer;