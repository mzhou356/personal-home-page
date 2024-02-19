import Item from "./item"
import { fetchItems } from "../api-client"

const Todos = () => {
    const data = fetchItems()
    return (
        <ul className="feedback-item">
            {data &&
                data.TODOs.map((item) => {
                    return <Item key={item.id} item={item} />
                })}
        </ul>
    )
}
export default Todos
