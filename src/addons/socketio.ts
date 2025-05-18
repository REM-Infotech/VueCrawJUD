import { io } from "socket.io-client";
const url_socket = import.meta.env.VITE_SOCKET_URL + "/logs";
export const socket = io(url_socket, {
  transports: ["websocket"],
});
