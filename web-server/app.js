import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import routes from "./routes/index.js"
import createError from "http-errors"

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = 3000

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// allow engine to access static files such as images
app.use(express.static(path.join(__dirname, "public")))

app.use("/", routes())

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 🤗.`)
})

export default app
