import * as React from "react"
const Item: React.FC<{ item: object }> = ({ item }) => {
    return <li>{item.name}</li>
}

export default Item
