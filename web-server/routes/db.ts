import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { MongoClient } from "mongodb"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.join(__dirname, "../.env") })

const DATABASE_NAME = process.env.db
const uri = `mongodb://${process.env.user}:${process.env.password}@localhost:27017/?authSource=${DATABASE_NAME}`

let connectedClient

export const connectClient = async () => {
    if (connectedClient) {
        return connectedClient.db(DATABASE_NAME)
    }

    const client = new MongoClient(uri)
    await client.connect()
    await client.db(DATABASE_NAME).command({ ping: 1 })
    console.info("Connected to MongoDB")

    connectedClient = client

    return connectedClient.db(DATABASE_NAME)
}

export const stopClient = async () => {
    await connectedClient?.close()
}
