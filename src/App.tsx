import './App.css'

import { Grid2, Paper, Box, Button, Container, Typography} from '@mui/material';

import DateLocale from './DateLocale';
import SwPicker from './SwPicker';
import WeSmartMenu from './WeSmartMenu';

// import swData from './assets/testdata'
import MbdaTheme from './MbdaTheme';


export function App() {

  return (
    <>
      <MbdaTheme>
        <DateLocale>
          <Grid2 container spacing={5}>
            <Grid2 size={12}>
              <WeSmartMenu></WeSmartMenu>
            </Grid2>
            <Grid2 size={{xs : 12, sm : 6}}>
              <Paper elevation={0} sx={{padding: "5px", margin: '5px'}} square>
                <Typography variant='subtitle2'>
                  Di recente il programma SPEAR ha raggiunto un traguardo importante con l’esito positivo di un lancio dimostrativo da un Typhoon della RAF presso il poligono di Vidsel in Svezia.
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{xs : 12, sm : 6}}>
                {/* <SwPicker></SwPicker> */}
            </Grid2>
            <Grid2 size={{xs : 12, sm : 12}}>
              <Container sx={{display: 'flex', justifyContent: 'center'}}>
                <Button variant='contained'>Esporta come .csv</Button>
              </Container>
            </Grid2>
          </Grid2>
        </DateLocale>
      </MbdaTheme>
    </>
  ) 
}