import sio from "socket.io-client";

const uri_server = import.meta.env.VITE_API_URL;
export default sio(uri_server, {
  autoConnect: false,
  agent: true,
  extraHeaders: {
    Authentication: "teste",
  },
});
