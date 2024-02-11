import { createRoot } from "react-dom/client"

const container = document.getElementById("react-app")
const App = () => {
    return <div> Hello from React! </div>
}
const root = createRoot(container)

root.render(<App />)
