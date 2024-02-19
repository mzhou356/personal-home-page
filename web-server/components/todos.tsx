import Item from "./item"
import { fetchItems } from "../api-client"
import { useEffect, useState, Suspense } from "react"

const Loading = () => {
    return <p>Loading to do lists ... </p>
}
const data = await fetchItems()
const items = data.TODOs
const Todos = () => {
    return (
        <Suspense fallback={<Loading />}>
            <ul className="feedback-item">
                {items.map((item) => {
                    return <Item key={item.id} item={item} />
                })}
            </ul>
        </Suspense>
    )
}
export default Todos
