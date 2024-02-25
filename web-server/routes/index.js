import express from "express"
import fitness_routes from "./fitness.js"

const router = express.Router()

const routes = (params) => {
    router.get("/", async (req, res, next) => {
        const { initialData } = params
        return res.render("./layouts", {
            template: "index",
            title: "Mindy's Home Page",
            initialData,
        })
    })

    router.use("/fitness", fitness_routes(params))

    return router
}

export default routes
