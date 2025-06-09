<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  width_sidebar: {
    type: String,
    default: "82px",
  },

  toggle: {
    type: Boolean,
    default: false,
  },
});

const inTransition = ref(false);

const route = useRoute();
const computedToggle = computed(() => props.toggle);
const widthCompute = computed(() => props.width_sidebar !== "82px");

function navClass(name: string) {
  return [
    "nav-link",
    "text-body-emphasis",
    "d-flex",
    "align-content-center",
    "align-items-start",
    { "active-purple": route.name === name },
  ];
}
</script>

<template>
  <div
    class="d-flex bg-body-tertiary flex-column"
    id="sidebar"
    :style="{ width: props.width_sidebar }"
    @transitionstart="inTransition = !inTransition"
    @transitionend="inTransition = !inTransition"
  >
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item border-bottom">
        <RouterLink :to="{ name: 'dashboard' }" :class="navClass('dashboard')">
          <IBiSpeedometer2
            class="me-2"
            :style="{ fontSize: computedToggle ? '20px' : '32px', transition: 'font-size 0.8s' }"
          />

          <span class="fw-bold sidebar-text align-text-start" title="Agendamentos">
            Dashboard
          </span>
        </RouterLink>
      </li>
      <li class="nav-item border-bottom">
        <RouterLink :to="{ name: 'bots' }" :class="navClass('bots')">
          <IBiRobot
            class="me-2"
            :style="{ fontSize: computedToggle ? '20px' : '32px', transition: 'font-size 0.8s' }"
          />
          <span class="fw-bold sidebar-text align-text-start" title="Agendamentos"> Robôs </span>
        </RouterLink>
      </li>
      <li class="nav-item border-bottom">
        <RouterLink :to="{ name: 'executions' }" :class="navClass('executions')">
          <IBiBarChartLine
            class="me-2"
            :style="{ fontSize: computedToggle ? '20px' : '32px', transition: 'font-size 0.8s' }"
          />
          <span class="fw-bold sidebar-text align-text-start" title="Agendamentos">
            Execuções
          </span>
        </RouterLink>
      </li>
      <li class="nav-item border-bottom">
        <RouterLink :to="{ name: 'scheduled' }" :class="navClass('scheduled')">
          <IBiCalendar2Date
            class="me-2"
            :style="{ fontSize: computedToggle ? '20px' : '32px', transition: 'font-size 0.8s' }"
          />
          <span class="fw-bold sidebar-text align-middle" title="Agendamentos"> Agendamentos </span>
        </RouterLink>
      </li>
    </ul>
    <hr />
    <div class="dropdown ms-2">
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

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.sidebar-text {
  max-width: 120px;
  overflow: hidden;
  text-overflow: clip;
  transition:
    max-width 0.8s,
    opacity 0.8s;
  opacity: 1;
}

#sidebar[style*="82px"] .sidebar-text {
  max-width: 0;
  opacity: 0;
  padding: 0;
}
</style>
