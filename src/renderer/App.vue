<script setup lang="ts">
import ModalLoading from "@components/ModalLoading.vue";
import ModalMessage from "@components/ModalMessage.vue";
import NavBarComponent from "./components/NavBarComponent.vue";
import SideBarComponent from "./components/SideBarComponent.vue";
</script>

<template>
  <ModalMessage />
  <NavBarComponent />

  <main>
    <SideBarComponent />
    <div class="mt-4">
      <RouterView />
    </div>
  </main>
  <ModalLoading />
</template>

<style>
.hide-content {
  background-color: rgba(255, 255, 255, 0);
}
</style>
