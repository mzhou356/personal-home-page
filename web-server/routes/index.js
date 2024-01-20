import express from "express"
import fitness_routes from "./fitness.js"

const router = express.Router()

const routes = (params) => {
    router.get("/", (req, res, next) => {
        return res.render("./layouts", {
            template: "index",
            title: "Mindy's Home Page",
        })
    })

    router.use("/fitness", fitness_routes(params))

    return router
}

export default routes
