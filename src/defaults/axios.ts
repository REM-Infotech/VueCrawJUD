import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;

export const api = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "X-Xsrf-Token",
  xsrfHeaderName: "X-Xsrf-Token",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
