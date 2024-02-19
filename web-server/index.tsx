import { createRoot } from "react-dom/client"
import App from "./components/app"

// const TODOS = [
//     "Leverage AI more",
//     "Build an api sever",
//     "focus on stress management blog",
// ]

const container = document.getElementById("react-app")

const root = createRoot(container)

root.render(<App />)
