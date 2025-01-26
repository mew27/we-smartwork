import { Box, Button, Container, Divider, Paper, SxProps, Typography, css, useTheme } from "@mui/material";
import { red } from '@mui/material/colors'
import { DateCalendar, DatePicker, DatePickerToolbarProps, PickersActionBar, PickersActionBarProps, PickersDay, PickersDayProps, StaticDatePicker } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Department, Employee } from "../interface/db_schema";
import { useState } from "react";

const maxSwDay = 8

dayjs.extend(customParseFormat)

interface SwPickerProps {
    user        : Employee | null,
    department  : Department | null,
    addSW       : (sw_days : Dayjs[]) => void
    removeSW    : (sw_days : Dayjs[]) => void
}

interface SwtoolbarProps extends DatePickerToolbarProps<Dayjs> {
    user : Employee | null,
    department : Department | null,
    remainingDays : number,
    animate : boolean,
}

const SwToolbar = ({value, toolbarFormat, className, user, remainingDays, animate, ...props} : SwtoolbarProps) => {
    return (<Box className={className} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Typography>{remainingDays} / 8 SW disponibili</Typography>
        </Box>)
}

interface SwDayProps extends PickersDayProps<Dayjs> {
    user : Employee | null,
    department : Department | null,
    selectedDays : Dayjs[],
    onDayClicked : (day : Dayjs) => void
}

const SwDay = ({user, department, selectedDays, className, day, outsideCurrentMonth, disabled, selected, onDayClicked, ...props} : SwDayProps) => {
    const isSmartWorking = user?.smart_working.current.includes(day.locale("it").format("D-M-YYYY"))
    const totalSmartWorking = department?.employees?.reduce((t, e) => e.smart_working.current.includes(day.format("D-M-YYYY")) ? t + 1 : t, 0)?? 0
    const isFull = totalSmartWorking > ((department?.employees?.length?? 0) / 2)
    const fullPercentage = totalSmartWorking / (department?.employees?.length??0 / 2)
    const isFutureMonths = day.isAfter(dayjs().endOf('month'))
    const isWeekend = day.locale("it").format('dddd') == 'Domenica' || day.locale("it").format('dddd') == 'Sabato'
    const swInWeek  = user?.smart_working.current.reduce((p, v) => day.isSame(dayjs(v, 'D-M-YYYY'), 'week') ? p + 1 : p, 0)?? 0
    const selInWeek = selectedDays.reduce((p, v) => day.isSame(dayjs(v, 'D-M-YYYY'), 'week') ? p + 1 : p, 0)
    const isEnabled = isFutureMonths && !isFull && !isWeekend  && ((swInWeek + selInWeek < 2) || selected) || isSmartWorking
    const theme = useTheme()
    
    let dayColor = "textPrimary"
    if (isSmartWorking)
        dayColor = "white"
    else if (isWeekend)
        dayColor = "textDisabled"
    else if (outsideCurrentMonth)
        dayColor = "textDisabled"


    let DayCssClass = css({
        width : "36px",
        height: "32px",
        margin: "2px",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        visibility: outsideCurrentMonth ? "hidden" : "visible"
    })

    let EnabledDayCss = css({
        cursor: "pointer",
        "&:hover" : {
            backgroundColor : "lightgrey"
        }
    })

    let selectedDayCss = css({
        border: "3px solid",
        borderColor: theme.palette.info.main
    })

    let selectedSwDayCss = css({
        border: "3px solid",
        borderColor: theme.palette.info.main,
        backgroundColor: theme.palette.info.light
    })

    let redShade = Math.round(fullPercentage * 9) * 100

    if (redShade > 50)
        console.log(day.format("D-M-YYYY"), fullPercentage, redShade, red[redShade as keyof typeof red])
    
    let FullDayCss = css({
        backgroundColor : redShade == 0 ? 'white' : red[redShade as keyof typeof red],
    })

    let SwDayCss = css({
        backgroundColor: theme.palette.info.main
    })

    let appliedCss = [DayCssClass]

    if(isSmartWorking)
        appliedCss.push(SwDayCss)

    if (isFutureMonths && !isSmartWorking)
        appliedCss.push(FullDayCss)

    if(isEnabled)
        appliedCss.push(EnabledDayCss)

    if(selected && !isSmartWorking)
        appliedCss.push(selectedDayCss)

    if(selected && isSmartWorking)
        appliedCss.push(selectedSwDayCss)

    return (<Box
        css={appliedCss}
        className={className}
        onClick={() => {
            if (isEnabled) {
                console.log("Selecting !!")
                onDayClicked(day)
            }
        }}
        >
            <Typography color={dayColor} fontSize="1rem !important">
                {day.format("DD")}
            </Typography>
        </Box>
    )
}

interface SwActionBarProps extends PickersActionBarProps {
    user : Employee | null,
    department : Department | null,
    selectedDays : Dayjs[]
    removeAllSelected: () => void,
    addAllSelected: () => void,
}

const SwActionBar = ({user, department, className, selectedDays, removeAllSelected, addAllSelected, ...props} : SwActionBarProps) => {

    return (<><Box className={className} display="flex" justifyContent="space-between" paddingBottom="1em" paddingRight="1em" paddingLeft="1em">
                <Button onClick={removeAllSelected} variant="contained" color="secondary" sx={{fontSize: "0.8em", visibility: selectedDays.length != 0 ? "visible" : "hidden"}}>Rimuovi tutti</Button>
                <Button onClick={addAllSelected}variant="contained" color="info" sx={{fontSize: "0.8em",visibility: selectedDays.length != 0 ? "visible" : "hidden"}}>Invia</Button>
            </Box></>)
}

function calcRemainingDays(selectedDays : Dayjs[], sw_days : string[], month : number) {
    const swDaysThisMonth = sw_days.reduce((p, v) => dayjs(v, "D-M-YY").month() == month ? p + 1 : p, 0)
    let remainingDays = maxSwDay

    for(let selectedDay of selectedDays) {
        let selectedDayStr = selectedDay.format("D-M-YYYY")
        
        if (selectedDay.month() != month)
            continue

        if (sw_days.includes(selectedDayStr)) {
            console.log("Dovrei essere qui")
            remainingDays += 1 
            continue
        }

        remainingDays -= 1
    }

    remainingDays -= swDaysThisMonth??0

    return remainingDays
}

function SwPicker({user, department, addSW, removeSW} : SwPickerProps) {
    const [selectedDays, setSelectedDays] = useState<Dayjs[]>([])
    const [month, setMonth] = useState<number>(dayjs().month())

    // const swMarkedForRemotion = selectedDays.reduce((p, v) => user?.smart_working.current.includes(v.format("DD-M-YYYY")) ? p: p + 1, 0)
    // const remainingDays = maxSwDay - selectedDays.reduce((p, v) => v.month() == month ? p + 1 : p, 0) - (swDaysThisMonth ?? 0) + swMarkedForRemotion

    const remainingDays = calcRemainingDays(selectedDays, user?.smart_working.current??[], month)

    return (
        <>  
            <Paper elevation={0}>
                <Typography sx={{display: "flex", justifyContent: "center", alignContent: "center"}} component="h1" variant="h5" color="secondary">Calendario Smart</Typography>
                <Box sx={{display:"flex", justifyContent: "center"}}><Divider sx={{marginTop: '1em', marginBottom: '1em', width: "85%"}}></Divider></Box>
                <StaticDatePicker
                    onMonthChange={(m) => {setMonth(m.month())}}
                    slots={{
                        toolbar: (props) => <SwToolbar 
                            user={user} 
                            department={department}
                            remainingDays={remainingDays}
                            animate={false}
                            {...props}/>,
                        day: (props) => <SwDay 
                            user={user} 
                            department={department} 
                            {...props} 
                            selected={selectedDays.some((v) => v.format("D-M-YYYY") == props.day.format("D-M-YYYY"))}
                            selectedDays={selectedDays}
                            onDayClicked={(d) => {
                                let nSelectedDays = []
                                
                                if (selectedDays.some((v) => v.format("D-M-YYYY") == props.day.format("D-M-YYYY")))
                                    nSelectedDays = selectedDays.filter((v) => v.format("D-M-YYYY") !== d.format("D-M-YYYY"))
                                else
                                    nSelectedDays = selectedDays.concat(d)

                                if(calcRemainingDays(nSelectedDays, user?.smart_working.current??[], month) >= 0)
                                    setSelectedDays(nSelectedDays)
                            }}
                            />,
                        actionBar: (props) => <SwActionBar 
                            user={user}
                            department={department}
                            selectedDays={selectedDays}
                            removeAllSelected={() => setSelectedDays([])}
                            addAllSelected={() => {
                                if (user != null && user.smart_working != null) {
                                    //user.smart_working.current = user.smart_working.current.concat(selectedDays.map((d) => d.format("D-M-YYYY")))
                                    setSelectedDays([])
                                    addSW(selectedDays)
                                }
                            }}
                            {...props}></SwActionBar>
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