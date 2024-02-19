import TODOs from "../routes/to-do"
import Header from "./header"
import Todos from "./todos"
import { useState, Suspense } from "react"
import ErrorBoundary from "./ErrorBoundary"

const Loading = () => {
    return <p>Loading to do lists ... </p>
}

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
            <ErrorBoundary
                fallback={
                    <div> Error occured when loading items lists ... </div>
                }
            >
                <Suspense fallback={<Loading />}>
                    <Todos />
                </Suspense>
            </ErrorBoundary>
        </>
    )
}

export default App
