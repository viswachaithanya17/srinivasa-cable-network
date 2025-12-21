import axios from "axios";

const api = axios.create({
  baseURL: "https://srinivasa-cable-network.onrender.com/api"
});

export default api;
