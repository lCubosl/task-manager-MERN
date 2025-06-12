import axios from "axios";

// no localhost in production mode. 
// When production mode is active url is /api
// when development mode is active url is http://localhost:5001/api
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

const api = axios.create({
  baseURL: BASE_URL,
})

export default api