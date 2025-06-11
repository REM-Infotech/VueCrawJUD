<template>
  <div class="container bg-white text-black">
    teste
    <button class="btn btn-success" @click="emitmessage">teste!</button>
  </div>
</template>
<script setup lang="ts">
import io from "@/resources/socketio";

function emitmessage() {
  io.emit("teste", { data: "teste", file: "teste" });
}

io.auth = {
  token: "teste",
};
io.connect();
</script>
