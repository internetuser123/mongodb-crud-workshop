const bodyParser = require("body-parser")
const express = require("express")
const exphbs = require("express-handlebars")
const { MongoClient, ObjectId } = require("mongodb")

const connectionUrl = "mongodb://localhost:27017"
const client = new MongoClient(connectionUrl)

const dbName = "crudWorkshop"

const app = express()

app.engine('hbs', exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}))

app.set("view engine", "hbs");

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

const getWorkshopCollection = async () => {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("workshop")

    return collection
}

app.get("/", async (req, res) => {
    const collection = await getWorkshopCollection()
    const findResult = await collection.find({}).toArray()
    console.log(findResult)
    res.render("home", {workshop: findResult})
})

app.get("/new-note", async (req, res) => {
    res.render("new-note")
})

app.post("/new-note", async (req, res) => {
    const newNote = {
        desc: req.body.desc,
    }

    const collection = await getWorkshopCollection()
    await collection.insertOne(newNote)

    res.redirect("/")
})

app.get("/edit-note", (req, res) => {
    
})

app.post("/edit-note", (req, res) => {
    const objectId = new ObjectId(req.params.id)
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})