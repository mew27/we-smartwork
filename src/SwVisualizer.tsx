import { Paper, Stack, Typography, Avatar, Button, Divider, Box, Container, IconButton } from "@mui/material";

interface SWVisualizerType {
    departmentName : string,
    date : string,
    usersInOffice : number,
    totalUsers : number
}

const SwVisualizer = () => {
    const numAccounts = 5

    return (<>
        <Container>
            <Paper elevation={0}>
                <Stack>
                    <Typography sx={{ display: "flex", justifyContent: "center" }} component="h1" variant="h5" color="secondary">Controls & Automations</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}><Divider sx={{ marginTop: '1em', marginBottom: '1em', width: "85%" }}></Divider></Box>
                    <Stack direction="row" spacing={-1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {[...Array(numAccounts).keys()].map((v) => <Avatar sx={{ width: 30, height: 30 }} src={`src/assets/account_icons/Account_${v + 2}.jpg`} key={v}></Avatar>)}
                        <Button color="info"><Typography variant="caption">{`+1 altro`}</Typography></Button>
                    </Stack>
                    <Stack direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <Typography>Martedì 15 Dicembre</Typography>
                        <Stack alignItems="center">
                            <Typography variant="h3">12</Typography><Typography color="grey" style={{ fontStyle: "italic" }}>25</Typography>
                            <Typography variant="body2">presenze in ufficio</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    </>);
}

export default SwVisualizer;