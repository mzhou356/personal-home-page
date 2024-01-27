import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { MongoClient } from "mongodb"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, "../.env") })

const uri = `mongodb://${process.env.user}:${process.env.password}@localhost:27017/?authSource=workouts`

const client = new MongoClient(uri)

async function connect() {
    try {
        console.log(uri)
        const db = client.db("workouts")
        const exercises = db.collection("exercises")
        const cursor = exercises.find().sort({ day_number: 1 })
        const all_exercises = await cursor.toArray()
        // for await (const exercise of exerciseCursor) {
        //     // console.log(exercise)
        //     all_exercises.push({
        //         day_of_week: exercise.day_of_week,
        //         type: exercise.type,
        //         exercises: exercise.exercises,
        //         rep_range: exercise.rep_range,
        //         set_range: exercise.set_range,
        //     })
        // }
        // console.log(all_exercises)
        return all_exercises
    } finally {
        await client.close()
    }
}

// connect().catch(console.dir)

export default connect
