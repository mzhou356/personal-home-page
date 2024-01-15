import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import routes from "./routes/index.js"

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = 3000

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// allow engine to access static files such as images
app.use(express.static(path.join(__dirname, "public")))

app.use("/", routes())

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 🤗.`)
})

export default app
