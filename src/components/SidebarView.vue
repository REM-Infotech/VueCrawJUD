<script setup lang="ts">
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleUp";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";

const props = defineProps({
  width_sidebar: {
    type: String,
    default: "80px",
  },
});

const widthCompute = computed(() => props.width_sidebar !== "80px");
const widthIcon = computed(() => (props.width_sidebar !== "80px" ? "xl" : "2xl"));
</script>

<template>
  <div
    class="d-flex bg-body-tertiary flex-column flex-shrink-0 p-3"
    id="sidebar"
    :style="{ width: props.width_sidebar }"
  >
    <a
      href="/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-body-emphasis text-decoration-none"
    >
      <svg class="bi pe-none me-2" width="40" height="32" aria-hidden="true">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <Transition>
        <span class="fs-4" v-if="widthCompute"> Sidebar </span>
      </Transition>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li>
        <a href="#" class="nav-link d-flex text-body-emphasis">
          <FontAwesomeIcon id="icon-transition" :icon="faArrowAltCircleUp" :size="widthIcon" />
          <Transition>
            <span class="fw-bold ms-2" v-if="widthCompute"> Dashboard </span>
          </Transition>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link d-flex text-body-emphasis">
          <FontAwesomeIcon id="icon-transition" :icon="faArrowAltCircleUp" :size="widthIcon" />
          <Transition>
            <span class="fw-bold ms-2" v-if="widthCompute"> Dashboard </span>
          </Transition>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link d-flex text-body-emphasis">
          <FontAwesomeIcon id="icon-transition" :icon="faArrowAltCircleUp" :size="widthIcon" />
          <Transition>
            <span class="fw-bold ms-2 align-text-center" v-if="widthCompute"> Dashboard </span>
          </Transition>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link d-flex text-body-emphasis">
          <FontAwesomeIcon id="icon-transition" :icon="faArrowAltCircleUp" :size="widthIcon" />
          <Transition>
            <span class="fw-bold ms-2" v-if="widthCompute"> Dashboard </span>
          </Transition>
        </a>
      </li>
    </ul>
    <hr />
    <div class="dropdown">
      <a
        href="#"
        class="d-flex align-items-center text-body-emphasis text-decoration-none"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://github.com/mdo.png"
          alt=""
          width="32"
          height="32"
          class="rounded-circle me-2"
        />
        <Transition>
          <strong v-if="widthCompute">mdo</strong>
        </Transition>
      </a>
      <ul class="dropdown-menu dropdown-menu-tertiary text-small shadow">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
#sidebar {
  transition: 0.8s;
  padding: 10px 0;
}

#icon-transition {
  transition: 0.7s;
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
