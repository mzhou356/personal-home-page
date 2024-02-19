import axios from "axios"

const PORT = process.env.PORT
const HOST = process.env.HOST

const API_SERVER_URL = `http://${HOST}:${PORT}/api`

export const fetchItems = async () => {
    const resp = await axios.get(`${API_SERVER_URL}/to-dos`)
    return resp.data
}
