<script setup lang="ts">
import FooterView from "./FooterView.vue";
import HeaderView from "./HeaderView.vue";
import SidebarView from "./SidebarView.vue";
</script>

<template>
  <div class="d-flex flex-column justify-content-center" id="page-content">
    <HeaderView />
    <div class="d-flex justify-content-center" id="render-setup">
      <SidebarView />
      <div class="ms-auto me-auto d-flex flex-column" id="render-content">
        <div class="mt-auto mb-auto">
          <slot></slot>
        </div>
        <FooterView />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#page-content {
  height: 100%;
  width: 100%;
}

#render-setup {
  width: 100%;
  height: 100%;
}

#render-content {
  height: 100%;
  width: 100%;
}
</style>
