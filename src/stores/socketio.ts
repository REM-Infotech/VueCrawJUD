import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import { ref } from "vue";

export const useSocketStore = defineStore("socket", () => {
  const socket = ref<Socket | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"; // URL base da API vinda do env

  function connect(namespace: string) {
    if (socket.value) {
      socket.value.disconnect(); // Desconecta do namespace atual, se existir
    }
    const fullUrl = `${apiBaseUrl}/${namespace}`; // Concatena a URL base com o namespace
    socket.value = io(fullUrl, { auth: { token: "your_token" } }); // Conecta ao novo namespace
  }

  function disconnect() {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  }

  return { socket, connect, disconnect };
});
