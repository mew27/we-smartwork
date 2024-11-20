import { useTheme } from "@emotion/react";
import { DateCalendar } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

function SwPicker() {
    return (
        <>
            <DateCalendar onChange={(newValue) => console.log(dayjs(newValue).format("DD-MM-YYYY"))} defaultValue={dayjs('22-11-2024', ["DD-MM-YYYY"])}></DateCalendar>
        </>
    )
}

export default SwPicker;