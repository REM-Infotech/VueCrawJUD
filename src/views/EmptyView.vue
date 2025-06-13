<template>
  <div class="container bg-white text-black">
    teste
    <BFormFile v-model="file" label="Hello!" />
    <button class="btn btn-success" @click="emitmessage()">teste!</button>
  </div>
</template>
<script setup lang="ts">
import manager from "@/resouces/socketio";
import { ref } from "vue";
const file = ref<File | null>(null);
const io = manager.socket("/filex");

async function emitmessage() {
  io?.emit("add_file", {
    data: "teste",
    files: {
      filename: file.value?.name as string,
      content: file.value,
      "Content-Type": file.value?.type,
    },
  });
}
</script>
