const express = require("express")
const router = express.Router()

const db = require("./../database/mongodb")

router.get("/", async (req, res) => {
    const notes = await db.getNotes()
    res.render("home", {notes})
})

router.get("/new-note", async (req, res) => {
    res.render("new-note")
})

router.post("/new-note", async (req, res) => {
    const newNote = {
        desc: req.body.desc,
    }

    await db.insertNote(newNote)

    res.redirect("/")
})

router.get("/note/:id", async (req, res) => { 
    const id = req.params.id
    const note = await db.getNoteById(id)
    res.render("edit-note", {note})
})

router.post("/edit-note/:id", async (req, res) => {
    const updatedNote = {
        desc: req.body.desc
    }
    
    const id = req.params.id
    await db.updateNoteById(id, updatedNote)

    res.redirect("/")
})

router.post("/delete-note/:id", async (req, res) => {
    const id = req.params.id
    await db.deleteNoteById(id)

    res.redirect("/")
})


module.exports = router;