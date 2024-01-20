import express from "express"
import workouts from "../data/workout.json" assert { type: "json" }

const router = express.Router()

const fitness_routes = (params) => {
    const { fitnessService } = params

    router.get("/", (req, res) => {
        return res.render("./layouts", {
            template: "fitness",
            workouts,
            title: "Movement",
        })
    })

    router.post("/", async (req, res) => {
        const { day, type, rep, sets, exercises } = req.body
        await fitnessService.updateData(day, type, rep, sets, exercises)
        return res.send("thanks :-) ")
    })

    return router
}

export default fitness_routes
