const { MongoClient, ObjectId} = require("mongodb")

const connectionUrl = "mongodb://localhost:27017"
const client = new MongoClient(connectionUrl)

const dbName = "crudWorkshop"

const getWorkshopCollection = async () => {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection("workshop")

    return collection;
}

module.exports.getNotes = async () => {
    const collection = await getWorkshopCollection()
    const findResult = await collection.find({}).toArray()

    return findResult;
}

module.exports.insertNote = async (newNote) => {
    const collection = await getWorkshopCollection()
    await collection.insertOne(newNote)
}

module.exports.getNoteById = async (id) => {
    const objectId = new ObjectId(id)
    const collection = await getWorkshopCollection()
    const note = await collection.findOne({_id: objectId})

    return note;
}

module.exports.updateNoteById = async (id, updatedNote) => {
    const objectId = new ObjectId(id)
    const collection = await getWorkshopCollection()
    await collection.updateOne({_id: objectId}, {$set: updatedNote})
}

module.exports.deleteNoteById = async (id) => {
    const objectId = new ObjectId(id)
    const collection = await getWorkshopCollection()
    await collection.deleteOne({_id: objectId})
}