import { useTheme } from "@emotion/react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

function SwPicker() {
    return (
        <>  
            <Paper elevation={0}>
                <Typography sx={{display: "flex", justifyContent: "center", alignContent: "center"}} component="h1" variant="h5" color="secondary">Calendario Smart</Typography>
                <Box sx={{display:"flex", justifyContent: "center"}}><Divider sx={{marginTop: '1em', marginBottom: '1em', width: "85%"}}></Divider></Box>                <DateCalendar onChange={(newValue) => console.log(dayjs(newValue).format("DD-MM-YYYY"))} defaultValue={dayjs('22-11-2024', ["DD-MM-YYYY"])}></DateCalendar>
            </Paper>
        </>
    )
}

export default SwPicker;