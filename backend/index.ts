import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/message", (_, res) => {res.send("Ciao mondo!")})
app.get("/message1", (_, res) => {res.json({status : "ok"})})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));