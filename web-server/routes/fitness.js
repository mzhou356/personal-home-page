import express from "express"
import workouts from "../data/workout.json" assert { type: "json" }
import { check, validationResult } from "express-validator"

const router = express.Router()
const validations = [
    check("day")
        .notEmpty()
        .trim()
        .isIn([
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ])
        .withMessage(
            "Please enter a day of week in lower case such as monday.",
        ),
    check("type")
        .notEmpty()
        .trim()
        .isIn(["cardio", "strength", "yoga"])
        .withMessage(
            "Please enter any of the 3 types: cardio, strength, yoga.",
        ),
    check("sets")
        .notEmpty()
        .isInt()
        .withMessage("Please enter number of sets as an int such as 3"),
    check("rep")
        .notEmpty()
        .isInt()
        .withMessage(
            "Please enter rep or duration range for the workout such as 20, unit is minutes",
        ),
    check("exercises")
        .notEmpty()
        .trim()
        .escape()
        .matches(/^[a-zA-Z\s]+(,[a-zA-Z\s]+)*$/)
        .withMessage(
            "The exercises need to be comma delimited such as squats,deadlift",
        ),
]

const fitness_routes = (params) => {
    const { fitnessService } = params

    router.get("/", (req, res) => {
        const errors = req.session.fitness ? req.session.fitness.errors : false
        const successMessage = req.session.fitness
            ? req.session.fitness.message
            : false
        return res.render("./layouts", {
            template: "fitness",
            workouts,
            title: "Movement",
            errors,
            successMessage,
        })
    })

    router.post("/", validations, async (req, res, next) => {
        const validateResult = validationResult(req)
        if (!validateResult.isEmpty()) {
            req.session.fitness = {
                errors: validateResult.array(),
            }
            console.log(req.session.fitness)
            return res.redirect("/fitness")
        }
        try {
            const { day, type, rep, sets, exercises } = req.body
            await fitnessService.updateData(day, type, rep, sets, exercises)
            req.session.fitness = {
                message: `workout has been updated for ${day}`,
            }
            return res.redirect("/fitness")
        } catch (err) {
            return next(err)
        }
    })

    return router
}

export default fitness_routes
