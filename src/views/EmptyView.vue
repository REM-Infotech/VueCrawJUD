<template>
  <div class="container bg-white text-black">
    teste
    <button class="btn btn-success" @click="emitmessage()">teste!</button>
  </div>
</template>
<script setup lang="ts">
import { useSocketStore } from "@/stores/socketio";
import { onBeforeMount } from "vue";
const socketStore = useSocketStore();
const io = socketStore.socket;

onBeforeMount(() => {
  socketStore.connect("/test");
  io?.connect();
});

function emitmessage() {
  io?.emit("teste", { data: "teste", file: "teste" });
}
</script>
