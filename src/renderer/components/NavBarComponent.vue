<template>
  <BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="dark" class="titlebar">
    <BNavbarBrand
      href="#"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasWithBothOptions"
      aria-controls="offcanvasWithBothOptions"
      class="rounded rounded-2 not_drag"
    >
      <img src="../assets/img/icon.ico" alt="logo" width="35px" />
      <button
        class="navbar-toggler rounded"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarsExample06"
        aria-controls="navbarsExample06"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </BNavbarBrand>
    <BNavbarBrand> </BNavbarBrand>
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
.not_drag {
  app-region: no-drag;
}

button {
  app-region: no-drag;
}

.titlebar {
  app-region: drag;
}
</style>
