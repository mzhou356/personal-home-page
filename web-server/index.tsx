import { createRoot } from "react-dom/client"
import App from "./components/app"
import axios from "axios"

const TODOS = [
    "Leverage AI more",
    "Build an api sever",
    "focus on stress management blog",
]

const PORT = process.env.PORT
const HOST = process.env.HOST

const API_SERVER_URL = `http://${HOST}:${PORT}/api`
const container = document.getElementById("react-app")

const root = createRoot(container)

axios.get(`${API_SERVER_URL}/to-dos`).then((resp) => {
    console.log(resp.data.data)
    root.render(<App TODOS={{ data: resp.data.data }} />)
})
