import './App.css'

import { Grid2, Stack } from '@mui/material';

import DateLocale from './DateLocale';
import WeSmartMenu from './WeSmartMenu';

// import swData from './assets/testdata'
import MbdaTheme from './MbdaTheme';
import InfoBox from './InfoBox';
import SwVisualizer from './SwVisualizer';
import SwPicker from './SwPicker';
import CandaLogo from './CandaLogo'


export function App() {

  return (
    <>
      <MbdaTheme>
        <DateLocale>
          <Stack spacing={6} alignItems="center">
            <WeSmartMenu></WeSmartMenu>
            <InfoBox sx={{width: 1}} title="Grande traguardo per MBDA!">
                Di recente il frogramma ha raggiunto un traguardo importante con l'esito positivo di un lancio dimostrativo da un Typhoon della RAF presso il poligono di Vidsel in Svezia.
            </InfoBox>
            <SwVisualizer></SwVisualizer>
            <SwPicker></SwPicker>
            <CandaLogo></CandaLogo>
          </Stack>
        </DateLocale>
      </MbdaTheme>
    </>
  ) 
}