import express from "express"

import cors from "cors"
import TODOs from "./to-do.js"

const apiRouter = express.Router()
apiRouter.use(cors())

apiRouter.get("/to-dos", (req, res) => {
    res.json({ TODOs })
})

export default apiRouter
