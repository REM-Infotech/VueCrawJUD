<template>
  <div class="container bg-white text-black">
    teste
    <BFormFile v-model="file" label="Hello!" />
    <button class="btn btn-success" @click="emitmessage()">teste!</button>
  </div>
</template>
<script setup lang="ts">
import { useSocketStore } from "@/stores/socketio";
import { onBeforeMount, ref } from "vue";
const file = ref<File | null>(null);
const socketStore = useSocketStore();
const io = socketStore.socket;

onBeforeMount(() => {
  socketStore.connect("/filex");
  io?.connect();
});

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
