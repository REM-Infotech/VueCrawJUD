<script setup lang="ts">
import { ref } from "vue";
import FooterView from "./FooterView.vue";
import HeaderView from "./HeaderView.vue";
import SidebarView from "./SidebarView.vue";

const width_sidebar = ref("82px");
const toggle = ref(false);
</script>

<template>
  <div class="d-flex flex-column justify-content-center" id="page-content">
    <HeaderView v-model:width_sidebar="width_sidebar" v-model:toggle="toggle" />
    <div class="d-flex justify-content-center" id="layoutSidenav">
      <SidebarView v-model:width_sidebar="width_sidebar" v-model:toggle="toggle" />
      <div class="ms-auto me-auto d-flex flex-column" id="layoutSidenav_content">
        <div class="container-fluid px-4 overflow-y-auto mb-auto" id="page-slot">
          <slot></slot>
        </div>
        <FooterView style="max-height: 55px" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#app #page-content,
#app #layoutSidenav,
#app #layoutSidenav_content {
  height: 100%;
  width: 100%;
}

#app #layoutSidenav #layoutSidenav_content #page-slot {
  width: 100%;
  height: calc(100dvh - 104px);
}
</style>
