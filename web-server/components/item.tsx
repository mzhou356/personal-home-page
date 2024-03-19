import * as React from "react"
const Item: React.FC<{ item: object; onClick: any }> = ({ item, onClick }) => {
    const handleclick = (event) => {
        event.preventDefault()
        onClick()
    }

    return <li onClick={handleclick}>{item.name}</li>
}

export default Item
