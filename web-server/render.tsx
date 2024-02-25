import ReactDOMServer from "react-dom/server"
import React, { useState } from "react"

const Header = ({ message }) => {
    return <div className="feedback-title"> {message} </div>
}

const Item: React.FC<{ item: object }> = ({ item }) => {
    return <li>{item.name}</li>
}

const data = [
    { id: "65ca0dde52488f5af385aa27", name: "write an AI bot" },
    { id: "65ca0df652488f5af385aa28", name: "write nutrition blog" },
    { id: "65ca0e0d52488f5af385aa29", name: "manage stress" },
]

const Todos = () => {
    return (
        <ul className="feedback-item">
            {data.map((item) => {
                return <Item key={item.id} item={item} />
            })}
        </ul>
    )
}

const App = () => {
    const [counter, setCounter] = useState(0)
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

const serverRender = () => {
    const initialData = ReactDOMServer.renderToString(<App />)
    return initialData
}

export default serverRender
