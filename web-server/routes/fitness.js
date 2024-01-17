import express from "express"
import workouts from "../data/workout.json" assert { type: "json" }

const router = express.Router()

const fitness_routes = () => {
    router.get("/", (req, res) => {
        return res.render("./layouts", {
            template: "fitness",
            workouts,
            title: "Movement",
        })
    })

    return router
}

export default fitness_routes
