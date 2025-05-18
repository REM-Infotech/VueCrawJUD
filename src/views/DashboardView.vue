<script setup lang="ts">
import NavbarView from "@/components/NavbarView.vue";
</script>

<template>
  <NavbarView />
  <div class="vh-50">
    <main class="d-flex justify-content-center align-items-center p-5" id="mainFrame"></main>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/scss/default.scss";
.main_login {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

.btn-purple {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

[data-bs-theme="dark"] {
  .main_login {
    background-color: $amethyst-950;
    color: #fff;
  }
  .main_frame {
    background-color: $amethyst-300;
  }
}
[data-bs-theme="light"] {
  .main_login {
    background-color: $amethyst-300;
  }
}
</style>
