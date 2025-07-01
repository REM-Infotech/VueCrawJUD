import { Manager } from "socket.io-client";

const baseUrl = new URL("/", import.meta.env.VITE_API_URL || "http://localhost:5000"); // URL base da API vinda do env

const manager = new Manager({
  host: baseUrl.hostname,
  port: baseUrl.port,
  secure: baseUrl.protocol === "https:",
  transports: ["websocket"],
  agent: true,
  autoConnect: true,
  withCredentials: true,
});
export default manager;
