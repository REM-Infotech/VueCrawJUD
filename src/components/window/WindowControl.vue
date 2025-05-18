<template>
  <div class="d-flex gap-2 ms-5">
    <BButton size="sm" variant="primary" @click="MinimizeWindow">
      <span>
        <FontAwesomeIcon :icon="faMinus" />
      </span>
    </BButton>
    <BButton size="sm" variant="outline-warning" @click="MaximizeWindow">
      <span>
        <FontAwesomeIcon :icon="faMaximize" />
      </span>
    </BButton>
    <BButton size="sm" variant="outline-danger" @click="closewindow">
      <span>
        <FontAwesomeIcon :icon="faClose" />
      </span>
    </BButton>
  </div>
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

<style scoped lang="css">
.not_drag {
  app-region: no-drag;
}

button {
  app-region: no-drag;
}
</style>
