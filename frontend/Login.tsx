import { Button, Stack, TextField, Typography } from "@mui/material"
import InfoBox from "./InfoBox"
import {useRef } from "react"

import { Employee } from "../interface/db_schema"

interface LoginProps {
    user : Employee | null,
    setUser : (newUser : Employee) => void,
    doLogin : (userName : string, password : string) => void,
    failedLogin : boolean
}

const Login = ({ doLogin, failedLogin} : LoginProps) => {
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)

    // const {user, setUser} = useContext(UserContext)

    return (<>
        <InfoBox title="Login richiesto">
        <Stack spacing={3}>
        <Typography>
            Per favore effettua il login per continuare.
        </Typography>
        <form onSubmit={(e) => {
            e.preventDefault()
            doLogin(usernameRef?.current?.value?? "", passwordRef?.current?.value?? "")
        }}>
            <Stack  spacing={3}>
            <TextField inputRef={usernameRef} name="username" id="username" label="Username"/>
            <TextField inputRef={passwordRef} name="password" id="password" label="Password" type="password"/>
            <Button type="submit" color="info" variant="contained">Login</Button>
            </Stack>
        </form>
        </Stack>
        </InfoBox>
        {failedLogin ? <InfoBox sx={{backgroundColor : "secondary.main"}} color="white" title="Email o Password errati!"/> : null}
    </>)
}

export default Login