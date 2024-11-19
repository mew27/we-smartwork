import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/it'
import dayjs from 'dayjs';

dayjs.extend(updateLocale)
dayjs.updateLocale('it', {
    months: 'Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre'.split('_')
})

function DateLocale ({children} : React.PropsWithChildren) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'it'}>
                {children}
            </LocalizationProvider>
        </>
    )
}

export default DateLocale