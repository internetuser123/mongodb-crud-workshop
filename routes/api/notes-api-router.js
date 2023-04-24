const express = require("express")
const router = express.Router()

const db = require("./../../database/mongodb")
const { ObjectId } = require("mongodb")

router.get("/", async (req, res) => {
    const notes = await db.getNotes()
    
    res.send(notes)
})

module.exports = router;