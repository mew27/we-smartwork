import { css, useTheme } from "@emotion/react";
import { Box, Button, Container, Divider, Paper, SxProps, Typography } from "@mui/material";
import { DateCalendar, DatePicker, DatePickerToolbarProps, PickersActionBar, PickersActionBarProps, PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Department, Employee } from "../interface/db_schema";
import { useState } from "react";

dayjs.extend(customParseFormat)

interface SwPickerProps {
    user : Employee | null,
    department : Department | null
}

type SwtoolbarProps = DatePickerToolbarProps<Dayjs> & SwPickerProps

const SwToolbar = ({value, toolbarFormat, className, user} : SwtoolbarProps) => {
    return (<Box className={className} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Typography>{value?.locale("it").format(toolbarFormat)}</Typography>
            {user?.smart_working.current.includes(value?.locale("it").format("D-M-YYYY") ?? "") ? <Typography color="secondary.light">Smart Working</Typography> : <Typography color="success">Ufficio</Typography>}
        </Box>)
}

type SwDayProps = PickersDayProps<Dayjs> & SwPickerProps

const SwDay = ({user, department, className, day, disabled, ...props} : SwDayProps) => {

    return (<PickersDay
                className={className}
                sx={user?.smart_working.current.includes(day.locale("it").format("D-M-YYYY"))? 
                    {backgroundColor: "info.main", borderRadius: "1em", color : "white !important"} 
                : 
                {}} 
                day={day}
                disabled={day.isBefore(dayjs().endOf('month'))}
                
                {...props}
                >
            </PickersDay>)
}

type SwActionBarProps = PickersActionBarProps & SwPickerProps

const SwActionBar = ({user, department, className, ...props} : SwActionBarProps) => {
    return (<><Box className={className} display="flex" justifyContent="flex-end" paddingBottom="1em" paddingRight="1em">
                <Button variant="contained" color="info">Aggiungi SW</Button>
            </Box></>)
}


function SwPicker({user, department} : SwPickerProps) {
    const [selectedDays, setSelectedDays] = useState<string[]>([])

    return (
        <>  
            <Paper elevation={0}>
                <Typography sx={{display: "flex", justifyContent: "center", alignContent: "center"}} component="h1" variant="h5" color="secondary">Calendario Smart</Typography>
                <Box sx={{display:"flex", justifyContent: "center"}}><Divider sx={{marginTop: '1em', marginBottom: '1em', width: "85%"}}></Divider></Box>
                <StaticDatePicker
                    onChange={(d) => {
                        console.log(selectedDays)
                        const formatDay = d?.format("D-M-YYYY")

                        if (formatDay != null)
                            setSelectedDays(selectedDays.filter((v) => v !== formatDay).concat(formatDay))
                    }}
                    defaultValue={dayjs()}
                    slots={{
                        toolbar: (props) => <SwToolbar user={user} department={department} {...props}/>,
                        day: (props) => <SwDay user={user} department={department} selected={selectedDays.includes(props.day.format("D-M-YYYY"))} {...props}/>,
                        actionBar: (props) => <SwActionBar user={user} department={department} {...props}></SwActionBar>
                    }}
                    slotProps={{
                        toolbar: {
                            toolbarFormat: 'DD MMMM',
                        },
                    }}
                    ></StaticDatePicker>
            </Paper>
        </>
    )
}

export default SwPicker;