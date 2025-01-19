import express from "express";
import ViteExpress from "vite-express";

import { MongoClient, ObjectId } from "mongodb"
import bodyParser from "body-parser"
import dayjs from "dayjs";

// const userList : Employee[] = [
//     {name: "Paolo Terzolo", role: "employee", smart_working: {current: []}}
// ]

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = "we-smartwork"

const app = express();

app.use(bodyParser.json())

app.post("/v1/login", async (req, res) => {

    console.log(`[${dayjs().format("HH:mm::ss DD/MM/YYYY")}] Reiceived login request from ${req.ip}`)

    const jsonResponse = {status: "unauthorized", userData : {}}

    if (req.body == null) {
        res.json(jsonResponse)
        return
    }

    let username = req.body.username
    let password = req.body.password

    const cursor = client.db(dbName).collection("employees").find({email : username, password : password})
    const resultArray = await cursor.toArray()

    if (resultArray.length == 0) {
        res.json(jsonResponse)
        return
    } else if (resultArray.length > 1) {
        res.json(jsonResponse)
        return
    } else {
        console.log(`[${dayjs().format("HH:mm::ss DD/MM/YYYY")}] Authorized user ${username}`)
        const { email, password, ...userData } = resultArray[0]
        jsonResponse.status   = "authorized"
        jsonResponse.userData = userData
        res.json(jsonResponse)
        return
    }
})

app.post("/v1/users/:user_id", async (req, res) => {
    var validSwDays : string[] = []

    try{
        var id_obj = new ObjectId(req.params.user_id)
    } catch (error) {
        //console.log(error)
        res.json({status: "failed"})
        return
    }

    if (req.body == null) {
        res.json({status: "failed"})
        return
    }

    const cursor = client.db(dbName).collection("employees").find({_id : id_obj})
    const users = await cursor.toArray()

    if (users.length != 1)
        res.json({status: "failed"})
    else {
        const user = users[0]
        const updatedUser : any = {}

        if (req.body.password != null && req.body?.oldPassword === user.password) {
            updatedUser['$set'] = {password : req.body.newPassword}
        }

        if (
            req.body.smart_working != null                && 
            req.body.smart_working.current != null        &&
            Array.isArray(req.body.smart_working.current)
        ) {
            for (let sw_day of req.body.smart_working.current) {
                let sw_day_str = sw_day.toString()

                if(dayjs(sw_day_str).isValid()){
                    validSwDays.push(sw_day_str)
                }
            }

            updatedUser['$push'] = {'smart_working.current' : {'$each' : validSwDays}}
        }

        if (Object.keys(updatedUser).length != 0) {
            console.log(updatedUser)
            const result = await client.db(dbName).collection("employees").updateOne({_id : id_obj}, updatedUser)
            
            if(result.modifiedCount == 0) {
                res.json({status: "failed"})
                return
            }

            res.json({status: "success", updated: {smart_working : {current: validSwDays}}})
            return
        }
    }
})

app.get("/v1/users/:user_id", async (req, res) => {
    try{
        var id_obj = new ObjectId(req.params.user_id)
    } catch (error) {
        //console.log(error)
        res.json({})
        return
    }

    const cursor = client.db(dbName).collection("employees").find({_id : id_obj})
    const users = await cursor.toArray()

    if (users.length != 1)
        res.json({})
    else {
        const { email, password, ...userData } = users[0]
        res.json(userData)
    }
})

app.get("/v1/departments/:department_id", async (req, res) => {
    try{
        var id_obj = new ObjectId(req.params.department_id)
    } catch (error) {
        //console.log(error)
        res.json({})
        return
    }

    const cursor = client.db(dbName).collection("departments").find({_id : id_obj})
    const departments = await cursor.toArray()

    if (departments.length != 1)
        res.json({})
    else {
        res.json(departments[0])
    }
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));