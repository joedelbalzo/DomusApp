import axios from "axios";

const devStatus: string = "development";
const baseUrl: string = devStatus == "development" ? "http://127.0.0.1:8000" : "";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
