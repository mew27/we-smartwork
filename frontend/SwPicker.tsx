import { css, useTheme } from "@emotion/react";
import { Box, Divider, Paper, SxProps, Typography } from "@mui/material";
import { DateCalendar, DatePicker, DatePickerToolbarProps, PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Department, Employee } from "../interface/db_schema";

dayjs.extend(customParseFormat)

interface SwPickerProps {
    user : Employee | null,
    department : Department | null
}

type SwtoolbarProps = DatePickerToolbarProps<Dayjs> & SwPickerProps

const SwToolbar = ({value, toolbarFormat, className, user} : SwtoolbarProps) => {
    return (<Box className={className} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Typography>{value?.locale("it").format(toolbarFormat)}</Typography>
            {user?.smart_working.current.includes(value?.locale("it").format("D-M-YYYY") ?? "") ? <Typography color="#0941ce">Smart Working</Typography> : <Typography color="success">Ufficio</Typography>}
        </Box>)
}

type SwDayProps = PickersDayProps<Dayjs> & SwPickerProps

const SwDay = ({user, department, className, day, ...props} : SwDayProps) => {

    return (<PickersDay
                sx={user?.smart_working.current.includes(day.locale("it").format("D-M-YYYY")) ? 
                    {backgroundColor: "info.light", borderRadius: "1em"} 
                : 
                {}} 
                day={day}
                {...props}>
            </PickersDay>)
}

function SwPicker({user, department} : SwPickerProps) {
    return (
        <>  
            <Paper elevation={0}>
                <Typography sx={{display: "flex", justifyContent: "center", alignContent: "center"}} component="h1" variant="h5" color="secondary">Calendario Smart</Typography>
                <Box sx={{display:"flex", justifyContent: "center"}}><Divider sx={{marginTop: '1em', marginBottom: '1em', width: "85%"}}></Divider></Box>
                <StaticDatePicker
                    // onChange={(newValue) => console.log(dayjs(newValue).format("DD-MM-YYYY"))}
                    slots={{
                        toolbar: (props) => <SwToolbar user={user} department={department} {...props}/>,
                        day: (props) => <SwDay user={user} department={department} {...props}/>
                    }}
                    slotProps={{
                        toolbar: {
                            toolbarFormat: 'DD MMMM',
                        }
                    }}
                    ></StaticDatePicker>
            </Paper>
        </>
    )
}

export default SwPicker;