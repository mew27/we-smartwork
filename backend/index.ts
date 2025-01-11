import express from "express";
import ViteExpress from "vite-express";

import { User } from "../interface/user";

const userList : User[] = [
    {name: "Paolo Terzolo", image: "", role: "employee"}
]

const app = express();

app.get("/v1/users/:user_name", (req, res) => {
    const userName = req.params.user_name;

    console.log(`GET user ${userName}`)

    for (let user of userList) {
        if (userName === user.name) {
            res.json(user)
            return
        }
    }
    res.json({})
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));