import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { MongoClient } from "mongodb"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, "../.env") })

const uri = `mongodb://${process.env.user}:${process.env.password}@localhost:27017/?authSource=${process.env.db}`

const client = new MongoClient(uri)

async function connect() {
    try {
        const db = client.db(process.env.db)
        const exercises = db.collection("exercises")
        const cursor = exercises.find().sort({ day_number: 1 })
        const all_exercises = await cursor.toArray()
        return all_exercises
    } catch (err) {
        console.log(err)
    }
}

export default connect
