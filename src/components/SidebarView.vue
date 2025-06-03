<script setup lang="ts">
import { faChartArea, faTachometer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  width_sidebar: {
    type: String,
    default: "80px",
  },
});
</script>

<template>
  <div class="bg-body-tertiary" id="sidebar" :style="{ width: props.width_sidebar }">
    <nav class="navbar navbar-expand-lg d-flex flex-column bg-body-tertiary">
      <div class="container-fluid d-flex flex-column justify-content-start align-items-start">
        <ul class="navbar-nav d-flex flex-column gap-3">
          <li class="nav-item">
            <a class="nav-link d-flex justify-content-center align-items-center gap-2" href="#">
              <FontAwesomeIcon :icon="faChartArea" color="blue" size="2xl" />
              <Transition>
                <span class="fw-bold ms-2" v-if="props.width_sidebar !== '80px'"> Dashboard </span>
              </Transition>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex justify-content-center align-items-center gap-2" href="#">
              <FontAwesomeIcon :icon="faTachometer" color="blue" size="2xl" />
              <Transition>
                <span class="fw-bold ms-2" v-if="props.width_sidebar !== '80px'"> Dashboard </span>
              </Transition>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="css" scoped>
#sidebar {
  width: 80px;
  transition: 0.8s;
}

.v-enter-active {
  transition: opacity 1.5s ease-in;
}
.v-leave-active {
  transition: opacity 0.2s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
