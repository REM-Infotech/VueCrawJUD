<script setup lang="ts">
import { $ } from "@shared/index";
import { useModal } from "bootstrap-vue-next";
import { onMounted } from "vue";
import BotForm from "./components/BotForm.vue";
import CardBot from "./components/CardBot.vue";
onMounted(() => {
  const { show } = useModal("ModalMessage");
  var message = sessionStorage.getItem("message");
  if (message) {
    $("#message").text(message);
    show();
    sessionStorage.removeItem("message");
  }
});
</script>

<template>
  <div class="p-3">
    <CardBot />
  </div>
  <BotForm />
</template>
