import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { MongoClient } from "mongodb"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, "../.env") })

const uri = `mongodb://${process.env.user}:${process.env.password}@localhost:27017/?authSource=${process.env.db}`

const client = new MongoClient(uri, { useUnifiedTopology: true })

class WorkoutService {
    constructor() {
        this.database = process.env.db
        this.client = client
    }

    async getData(collection, sort_key = null, ascending = 1) {
        try {
            await client.connect()
            const db = client.db(this.database)
            const exercises = db.collection(collection)
            const cursor = exercises.find()
            const result = sort_key
                ? cursor.sort({ day_number: ascending })
                : cursor
            const all_exercises = await result.toArray()
            return all_exercises
        } catch (err) {
            console.log(err)
        } finally {
            await client.close()
        }
    }
}

export default WorkoutService
