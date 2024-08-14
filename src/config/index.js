import axios from "axios";

const http = axios.create({
    baseURL: "https://reqres.in"
})


http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers["Authorization"] = `${token}`
    }
    return config
})

export default http

