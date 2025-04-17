<template>
  <BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="dark" class="titlebar">
    <BNavbarBrand>
      <img src="../assets/img/icon.ico" alt="logo" width="20%" />
    </BNavbarBrand>
    <BNavbarNav class="ms-auto">
      <BButton size="sm" variant="outline-primary" @click="MinimizeWindow" class="me-2">
        <span>
          <FontAwesomeIcon :icon="faMinus" />
        </span>
      </BButton>
      <BButton size="sm" variant="outline-warning" @click="MaximizeWindow" class="me-2">
        <span>
          <FontAwesomeIcon :icon="faMaximize" />
        </span>
      </BButton>
      <BButton size="sm" variant="outline-danger" @click="closewindow">
        <span>
          <FontAwesomeIcon :icon="faClose" />
        </span>
      </BButton>
    </BNavbarNav>
  </BNavbar>
</template>

<script setup lang="ts">
import { faClose, faMaximize, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const MinimizeWindow = () => {
  window.electronAPI.minimize();
};
const MaximizeWindow = () => {
  window.electronAPI.maximize();
};

const closewindow = () => {
  window.electronAPI.close();
};
</script>

<style lang="scss">
button {
  app-region: no-drag;
}

.titlebar {
  app-region: drag;
}
</style>
