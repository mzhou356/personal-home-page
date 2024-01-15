import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = 3000

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    return res.render("./pages/")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 🤗.`)
})

export default app
