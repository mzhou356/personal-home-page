import axios from "axios"
import { useState, useEffect } from "react"

const PORT = process.env.PORT
const HOST = process.env.HOST

const API_SERVER_URL = `http://${HOST}:${PORT}/api`

const promiseWrapper = (promise) => {
    let status = "pending"
    let result

    const s = promise.then(
        (value) => {
            status = "success"
            result = value
        },
        (error) => {
            status = "error"
            result = error
        },
    )

    return () => {
        switch (status) {
            case "pending":
                throw s
            case "success":
                return result
            case "error":
                throw result
            default:
                throw new Error("Unknown status")
        }
    }
}

export const fetchItems = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const promise = axios
                .get(`${API_SERVER_URL}/to-dos`)
                .then((resp) => resp.data)
            setData(promiseWrapper(promise))
        }
        getData()
    }, [])
    return data
}
