import express from "express"

const router = express.Router()

const routes = () => {
    router.get("/", (req, res, next) => {
        return res.render("./pages/")
    })

    return router
}

export default routes
