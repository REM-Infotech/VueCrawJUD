<script setup lang="ts">
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

defineProps({
  width_sidebar: {
    type: String,
    default: "65px",
  },
});

const router = useRouter();

const expand_sidebar = ref(false);
const computeExpand = computed(() => (expand_sidebar.value ? "250px" : "65px"));

const emit = defineEmits(["update:width_sidebar"]);

watch(expand_sidebar, () => {
  return emit("update:width_sidebar", computeExpand.value);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click="expand_sidebar = !expand_sidebar">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <div class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button
            @click="router.push({ name: 'login' })"
            class="btn btn-outline-danger d-flex justify-content-start align-items-start"
            type="submit"
          >
            <div>
              <FontAwesomeIcon :icon="faArrowRightFromBracket" />
            </div>
            <span class="ms-2 fw-bold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
