import express from "express"

import { connectClient } from "./db.js"

import cors from "cors"
const apiRouter = express.Router()
apiRouter.use(cors())

apiRouter.get("/to-dos", async (req, res) => {
    const client = await connectClient()
    const tests = await client
        .collection("to-do-tests")
        .find()
        .project({
            _id: 1,
            name: 1,
        })
        .toArray()
    res.json({ TODOs: tests })
})

apiRouter.get("/to-dos/:Id", async (req, res) => {
    const client = await connectClient()

    const item = await client
        .collection("to-do-tests")
        .findOne({ _id: req.params.Id })

    res.json({ item })
})
export default apiRouter
