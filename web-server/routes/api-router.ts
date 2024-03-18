import express from "express"

import { connectClient } from "./db.js"

import cors from "cors"
const apiRouter = express.Router()
apiRouter.use(cors())

apiRouter.get("/to-dos", async (req, res) => {
    const client = await connectClient()
    const tests = await client.collection("to-do-tests").find().toArray()
    res.json({ TODOs: tests })
})

export default apiRouter
