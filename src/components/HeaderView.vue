<script setup lang="ts">
import logoimg from "@/assets/img/logo2.png";
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
      <a
        href="#"
        class="navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto text-body-emphasis text-decoration-none"
        @click="expand_sidebar = !expand_sidebar"
      >
        <img :src="logoimg" class="ms-2 bi pe-none me-2" alt="" width="40" aria-hidden="true" />

        <span class="fs-4"> Sidebar </span>
      </a>
      <div class="d-flex gap-2" role="search">
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
  </nav>
</template>
