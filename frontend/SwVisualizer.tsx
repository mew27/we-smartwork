import { Paper, Stack, Typography, Avatar, Button, Divider, Box, Container, IconButton } from "@mui/material";
import 'dayjs/locale/it'
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./AppContext";
import { Department, Employee } from "../interface/db_schema";

// interface SWVisualizerType {
//     departmentName : string,
//     date : string,
//     usersInOffice : number,
//     totalUsers : number
// }

const apiUrl = "/v1/departments/" 

interface SwVisualizerProps {
    user : Employee | null,
    department : Department | null
}

const SwVisualizer = ({user, department} : SwVisualizerProps) => {
    const numAccounts = 5
    
    const today = dayjs().locale("it").format("D-M-YYYY")
    const totalDepEmployees = department?.employees?.length ?? 0
    const totalDepSmart     = department?.employees?.reduce((t, e) => e.smart_working.current.includes(today) ? t : t + 1, 0)
    
    return (<>
        <Container>
            <Paper elevation={0}>
                <Stack>
                    <Typography sx={{ display: "flex", justifyContent: "center"}} component="h1" variant="h5" color="secondary">{user?.department?.name}</Typography>
                    {/* <Typography variant="h6" sx={{ display: "flex", justifyContent: "center"}} >{user.smart_working.current.includes(today) ? "Sei in smart working" : "Sei in ufficio"}</Typography> */}
                    <Box sx={{ display: "flex", justifyContent: "center" }}><Divider sx={{ marginTop: '1em', marginBottom: '1em', width: "85%" }}></Divider></Box>
                    <Stack direction="row" spacing={-1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        {[...Array(numAccounts).keys()].map((v) => <Avatar sx={{ width: 30, height: 30 }} src={`frontend/assets/account_icons/Account_${v + 2}.jpg`} key={v}></Avatar>)}
                        <Button color="info"><Typography variant="caption">{`+1 altro`}</Typography></Button>
                    </Stack>
                    <Stack direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <Stack>
                            <Typography variant="h5" color="secondary" sx={{ display: "flex", justifyContent: "center"}} >{user?.smart_working.current.includes(today) ? "Sei in smart working" : "Sei in ufficio"}</Typography>
                            <Typography>{dayjs().locale("it").format("dddd D MMMM")}</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography variant="h3">{totalDepSmart}</Typography>
                            <Typography color="grey" style={{ fontStyle: "italic" }} fontSize="0.8em">/ {totalDepEmployees}</Typography>
                            <Typography variant="body2">presenti in ufficio</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    </>);
}

export default SwVisualizer;