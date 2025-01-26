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

interface SwAttendance {
    user : Employee | null,
    department : Department | null,
} 
const SwAttendanceCounter = ({user, department} : SwAttendance) => {
    const today = dayjs().locale('it')

    const totalDepEmployees = department?.employees?.length ?? 0
    const totalDepOffice     = department?.employees?.reduce((t, e) => e.smart_working.current.includes(today.format("D-M-YYYY")) ? t : t + 1, 0)


    if (today.format('dddd') == 'Domenica' || today.format('dddd') == 'Sabato') {
        return (<Stack alignItems="center">
            <Typography variant="h3">{totalDepEmployees}</Typography>
            <Typography color="grey" style={{ fontStyle: "italic" }} fontSize="0.8em">/ {totalDepEmployees}</Typography>
            <Typography variant="body2">presenti a casa loro!</Typography>
        </Stack>)
    } else {
        return (<Stack alignItems="center">
            <Typography variant="h3">{totalDepOffice}</Typography>
            <Typography color="grey" style={{ fontStyle: "italic" }} fontSize="0.8em">/ {totalDepEmployees}</Typography>
            <Typography variant="body2">presenti in ufficio</Typography>
        </Stack>)
    }
}

interface SwTextProps {
    user : Employee | null
}

const SwText = ({user} : SwTextProps) => {
        const today = dayjs().locale('it')

        if (today.format('dddd') == 'Domenica' || today.format('dddd') == 'Sabato') {
            return (<Stack>
                <Typography>{today.format("dddd DD MMMM")}</Typography>
                <Typography 
                    variant="h5" 
                    color="success" 
                    sx={{ display: "flex", justifyContent: "center"}}>
                        È il Weekend!!
                </Typography>
            </Stack>)
        } else if (user?.smart_working.current.includes(today.format("D-M-YYYY"))) {
            return (<Stack>
                <Typography>{today.format("dddd DD MMMM")}</Typography>
                <Typography 
                    variant="h5" 
                    color="secondary" 
                    sx={{ display: "flex", justifyContent: "center"}}>
                        Sei in Smart Working
                </Typography>
            </Stack>)
        } else {
            return (<Stack>
                <Typography>{today.format("dddd DD MMMM")}</Typography>
                <Typography 
                    variant="h5" 
                    color="secondary" 
                    sx={{ display: "flex", justifyContent: "center"}}>
                        Sei in ufficio
                </Typography>
            </Stack>)        
        }
}

interface SwVisualizerProps {
    user : Employee | null,
    department : Department | null
}

function getAbbrvName(user : Employee) {
    let name    = user.name.split(" ")[0]
    let surname = user.name.split(" ").slice(1).join(" ")
    
    return name[0] + '. ' + surname
}

const SwVisualizer = ({user, department} : SwVisualizerProps) => {

    return (<>
        <Container>
            <Paper elevation={0}>
                <Stack>
                    <Typography sx={{ display: "flex", justifyContent: "center"}} component="h1" variant="h5" color="secondary">{user?.department?.name}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}><Divider sx={{ marginTop: '1em', marginBottom: '1em', width: "85%" }}></Divider></Box>
                    <Stack direction="row" spacing={-1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button color="info"><Typography variant="caption">{department?.employees?.map((u, i) => getAbbrvName(u) + ', ').slice(0, 2)}{`+${(department?.employees?.length?? 0) - 2} altri`}</Typography></Button>
                    </Stack>
                    <Stack direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                        <SwText user={user}/>
                        <SwAttendanceCounter user={user} department={department}/>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    </>);
}

export default SwVisualizer;