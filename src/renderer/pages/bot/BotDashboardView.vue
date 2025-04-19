<script setup lang="ts">
import NavBarComponent from "@components/NavBarComponent.vue";
import SideBarComponent from "@components/SideBarComponent.vue";
import { $ } from "@plugins/globals";
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
  <NavBarComponent />
  <div id="content" class="mt-4 mb-4">
    <SideBarComponent />
    <main class="overflow-y-auto">
      <BContainer fluid="lg" class="px-4 overflow-auto overflow-auto">
        <CardBot />
      </BContainer>
    </main>
  </div>
  <BotForm />
</template>
