import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import TODOs from "./to-do.js"

// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const file_path = path.join(__dirname, "/workouts.to-do-tests.json")
// const TODOs = new URL(`file://${file_path}`)

const apiRouter = express.Router()

apiRouter.get("/to-dos", (req, res) => {
    res.send(TODOs)
})

export default apiRouter
