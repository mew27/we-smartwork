//Global Styles
import "./App.css"

import { Dialog, DialogContent, DialogContentText, DialogTitle, Input, Stack } from '@mui/material';

import DateLocale from './DateLocale';
import WeSmartMenu from './WeSmartMenu';

// import swData from './assets/testdata'
import MbdaTheme from './MbdaTheme';
import InfoBox from './InfoBox';
import SwVisualizer from './SwVisualizer';
import SwPicker from './SwPicker';
import CandaLogo from './CandaLogo'
import { useState } from 'react';
import Search from './Search';

import { Employee } from '../interface/user'

export function App() {

  const [searching, setSearching] = useState(false)
  const [user, setUser] = useState<Employee | null>(null)

  return (
    <>
      <MbdaTheme>
        <DateLocale>
          <Search open={searching} onClose={() => {setSearching(false)}}></Search>
          <Stack spacing={6} alignItems="center">
            <WeSmartMenu onClickSearch={() => {setSearching(true)}}></WeSmartMenu>
            <InfoBox sx={{width: 1}} title="Grande traguardo per MBDA!">
                Di recente il programma SPEAR ha raggiunto un traguardo importante con l'esito positivo di un lancio dimostrativo da un Typhoon della RAF presso il poligono di Vidsel in Svezia.
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