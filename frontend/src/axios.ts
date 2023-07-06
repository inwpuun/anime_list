import axios, { AxiosInstance } from "axios"

const client: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
  },
})

export { client }
