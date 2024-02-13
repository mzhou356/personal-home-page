import Item from "./item"

const Todos = ({ data }) => {
    return (
        <ul className="feedback-item">
            {data.map((item) => {
                return <Item key={item.id} item={item} />
            })}
        </ul>
    )
}
export default Todos
