import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common = {
  "Content-Type": "application/json",
};
