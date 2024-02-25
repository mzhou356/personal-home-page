import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import routes from "./routes/index.js"
import createError from "http-errors"
import WorkoutService from "./services/WorkoutService.js"
import bodyParser from "body-parser"
import cookieSession from "cookie-session"
import apiRouter from "./routes/api-router.js"
import serverRender from "./render.js"
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = 3000
const HOST = "localhost"

const workoutService = new WorkoutService()
const initialData = serverRender()

// trust reverse proxy, X-forwarded-for header
app.set("trust proxy", 1)

//set up cookie
app.use(
    cookieSession({
        name: "session",
        keys: ["slkoduopo", "ywooppsdsl"],
    }),
)

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// allow engine to access static files such as images
app.use(express.static(path.join(__dirname, "public")))

// allow parsing for post
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // rest

app.use("/", routes({ initialData, workoutService }))

app.use("/api", apiRouter)

// handle all remaining routes 404
app.use((req, res, next) => {
    next(createError(404))
})

// error handle middlewawre
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = err
    res.locals.status = err.status || 500

    res.status(res.locals.status)

    res.render("./error")
})

app.listen(PORT, HOST, () => {
    console.log(`Listening on port ${PORT} 🤗.`)
})

export default app
