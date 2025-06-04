<script setup lang="ts">
import { ref } from "vue";
import FooterView from "./FooterView.vue";
import HeaderView from "./HeaderView.vue";
import SidebarView from "./SidebarView.vue";

const width_sidebar = ref("65px");
</script>

<template>
  <div class="d-flex flex-column justify-content-center" id="page-content">
    <HeaderView v-model:width_sidebar="width_sidebar" />
    <div class="d-flex justify-content-center" id="render-setup">
      <SidebarView v-model:width_sidebar="width_sidebar" />
      <div class="ms-auto me-auto d-flex flex-column" id="render-content">
        <main class="mb-auto overflow-y-auto">
          <slot></slot>
        </main>
        <FooterView />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#page-content {
  width: 100%;
}

#render-setup {
  width: 100%;
}

#render-content {
  width: 100%;
}
</style>
