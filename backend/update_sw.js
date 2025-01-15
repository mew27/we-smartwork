import { MongoClient, ObjectId } from "mongodb"

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = "we-smartwork"

async function getCanda() {
    const depCursor = client.db(dbName).collection("departments").find({name: "CandA"})

    return depCursor.toArray()
}

async function updateEmployees(employeeId, employeeSmartWork) {
    client.db(dbName).collection("employees").updateOne({_id : employeeId}, {$set: {smart_working: employeeSmartWork}})
}
const canda = await getCanda()

for (let employee of canda[0].employees) {
    let employeeId = employee._id
    let employeeSmartWork = employee.smart_working

    console.log(`Updating ${employee.name}`)
    await updateEmployees(employeeId, employeeSmartWork)
    console.log(`Updated! ${employee.name}`)
}