const bodyParser = require("body-parser")
const express = require("express")
const exphbs = require("express-handlebars")

const webRouter = require("./routes/web-router")
const notesApiRouter = require("./routes/api/notes-api-router")

const app = express()

app.engine('hbs', exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs"
}))

app.set("view engine", "hbs");

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/", webRouter)
app.use("/api/notes", notesApiRouter)

app.listen(3000, () => {
    console.log("http://localhost:3000")
})