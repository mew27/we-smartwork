//Global Styles
import "./App.css"

import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel, Stack, TextField, Typography } from '@mui/material';

import DateLocale from './DateLocale';
import WeSmartMenu from './WeSmartMenu';

// import swData from './assets/testdata'
import MbdaTheme from './MbdaTheme';
import InfoBox from './InfoBox';
import SwVisualizer from './SwVisualizer';
import SwPicker from './SwPicker';
import CandaLogo from './CandaLogo'
import { useEffect, useRef, useState } from 'react';
import Search from './Search';

import { Department, Employee } from '../interface/db_schema'
import { UserContext } from "./AppContext";
import Login from "./Login";
import dayjs from "dayjs";


async function login(userName : string, password : string) {
  return fetch("/v1/login", {
    headers: {"Content-Type" : "application/json"}, 
    method: "POST", 
    body: JSON.stringify({
        username: userName,
        password: password})
    }).then((res) => res.json())
}

export function App() {
  const [searching, setSearching] = useState(false)
  const [user, setUser] = useState<Employee | null>(null)
  const [failedLogin, setFailedLogin] = useState(false)
  const [department, setDepartment] = useState<Department | null>(null)

  useEffect(() => {
    fetch("/v1/departments/" + user?.department?._id).then((res) => res.json()).then((data : Department) => {
        setDepartment(data)
    })
  }, [user])


  return (
    <>
      <MbdaTheme>
        <DateLocale>
          {/* <UserContext.Provider value={{user : user, setUser : (user) => setUser(user)}}> */}
            <Search open={searching} onClose={() => {setSearching(false)}}></Search>
            <Stack spacing={6} alignItems="center">
              <WeSmartMenu user={user} onClickSearch={() => {setSearching(true)}}></WeSmartMenu>
              {
              user != null ?
              (<>
                {/* <InfoBox title="Grande traguardo per MBDA!">
                  <Typography>
                    Di recente il programma SPEAR ha raggiunto un traguardo importante con l'esito positivo di un lancio dimostrativo da un Typhoon della RAF presso il poligono di Vidsel in Svezia.
                  </Typography>
                </InfoBox> */}
                <SwVisualizer user={user} department={department}></SwVisualizer>
                <SwPicker user={user} department={department}></SwPicker>
              </>)
              :
                <Login 
                  user={user}
                  setUser={(newUser) => {setUser(newUser)}}
                  failedLogin={failedLogin}
                  doLogin={(username, password) => {
                    login(username, password).then((res) => {
                      if (res == null || res.status !== "authorized") {
                        setFailedLogin(true)
                      } else {
                        setFailedLogin(false)
                        setUser(res.userData)
                      }
                    })
                  }}>
                </Login>
              }

            </Stack>
          {/* </UserContext.Provider> */}
        </DateLocale>
      </MbdaTheme>
    </>
  ) 
}