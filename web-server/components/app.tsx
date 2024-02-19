import TODOs from "../routes/to-do"
import Header from "./header"
import Todos from "./todos"
import { useState, useEffect } from "react"

const App = () => {
    const [counter, setCounter] = useState(0)
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setCounter(counter + 1)
    //     }, 1000)
    //     return () => {
    //         clearInterval(id)
    //     }
    // }, [counter])
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
            <Todos />
        </>
    )
}

export default App
