<script setup lang="ts">
import ModalLoading from "./components/ModalLoading.vue";
import ModalMessage from "./components/ModalMessage.vue";
import NavBarComponent from "./components/NavBarComponent.vue";
import SideBarComponent from "./components/SideBarComponent.vue";
</script>

<template>
  <ModalMessage />
  <NavBarComponent />
  <main class="overflow-y-auto overflow-x-hidden" id="app_content">
    <SideBarComponent />
    <div class="mt-4 mb-4">
      <RouterView />
    </div>
  </main>
  <ModalLoading />
</template>

<style>
.hide-content {
  background-color: rgba(255, 255, 255, 0);
}

#app_content {
  height: calc(100vh - 115px);
}
</style>
