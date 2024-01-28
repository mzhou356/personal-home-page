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
        this.is_connected = false
    }

    async connect() {
        try {
            if (!this.is_connected) {
                await this.client.connect()
                this.is_connected = true
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getData(collection, sort_key = null, ascending = 1) {
        try {
            await this.connect()
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
            this.close_connection()
        }
    }

    async updateData(collection, dayOfWeek, workoutType, rep, sets, exercises) {
        try {
            await this.client.connect()
            const db = client.db(this.database)
            const data = db.collection(collection)
            data.updateOne(
                { day_of_week: dayOfWeek },
                {
                    $set: {
                        day_of_week: dayOfWeek,
                        type: workoutType,
                        exercises: exercises.split(","),
                        rep_range: rep,
                        set_range: sets,
                    },
                },
                {},
            )
        } catch (err) {
            console.log(err)
        }
    }

    async close_connection() {
        try {
            if (this.is_connected) {
                await this.client.close()
                this.is_connected = false
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export default WorkoutService
