import { createRoot } from "react-dom/client"
import App from "./components/app"

const container = document.getElementById("react-app")

const root = createRoot(container)

root.render(<App />)
