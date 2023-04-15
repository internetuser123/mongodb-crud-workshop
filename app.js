const express = require("express")
const exphbs = require("express-handlebars")
const { MongoClient } = require("mongodb")

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