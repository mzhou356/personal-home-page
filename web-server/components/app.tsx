import Header from "./Header"
import { useState, useEffect } from "react"

const App = ({ TODOS }) => {
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        const id = setInterval(() => {
            setCounter(counter + 1)
        }, 1000)
        return () => {
            clearInterval(id)
        }
    }, [counter])
    return (
        <>
            <Header message="Welcome to my to do list." />
            <button
                onClick={() => {
                    setCounter(counter + 1)
                }}
            >
                {counter}
            </button>
            <ul className="feedback-item">
                {TODOS.map((elt, key) => {
                    return <li key={key}>{elt}</li>
                })}
            </ul>
        </>
    )
}

export default App
