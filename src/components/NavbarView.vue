<script setup lang="ts">
import WindowControl from "./window/WindowControl.vue";
</script>

<template>
  <nav class="navbar navbar-expand-lg app-navbar titlebar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <WindowControl />
    </div>
  </nav>
</template>
<style scoped lang="css">
.titlebar {
  app-region: drag;
}
</style>
