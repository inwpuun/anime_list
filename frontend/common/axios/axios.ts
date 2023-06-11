import axios from "axios"

const client = axios.create({
  baseURL: "http://localhost:3000",
})

client.defaults.withCredentials = true

export { client }
