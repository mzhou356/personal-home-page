import Item from "./item"
import { fetchItems } from "../api-client"

const Todos = ({ onItemClick }) => {
    const data = fetchItems()
    return (
        <ul className="feedback-item">
            {data &&
                data.TODOs.map((item) => {
                    return (
                        <Item
                            key={item._id}
                            item={item}
                            onClick={onItemClick}
                        />
                    )
                })}
        </ul>
    )
}
export default Todos
