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

    const url = new URL(namespace, apiBaseUrl).toString(); // Cria um objeto URL para manipular a URL base
    socket.value = io(url, { withCredentials: true }); // Conecta ao novo namespace
  }

  function disconnect() {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  }

  return { socket, connect, disconnect };
});
