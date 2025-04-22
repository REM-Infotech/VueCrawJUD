<script setup lang="ts">
import ModalLoading from "./components/ModalLoading.vue";
import ModalMessage from "./components/ModalMessage.vue";
import NavBarComponent from "./components/NavBarComponent.vue";
import SideBarComponent from "./components/SideBarComponent.vue";
</script>

<template>
  <ModalMessage />
  <NavBarComponent />
  <main class="overflow-auto" id="app_content">
    <SideBarComponent />
    <div class="mt-4 mb-4">
      <RouterView />
    </div>
  </main>
  <ModalLoading />
  <footer class="mt-auto bg-dark text-white p-3" data-bs-theme="dark">
    <span>© 2025 Company, Inc</span>
  </footer>
  <!-- <footer

    data-bs-theme="dark"
  >
    <div class="col-md-4 d-flex align-items-center">
      <a
        href="/"
        class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
        aria-label="Bootstrap"
      >
        <svg class="bi" width="30" height="24" aria-hidden="true">
          <use xlink:href="#bootstrap"></use>
        </svg>
      </a>

    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3">
        <a class="text-body-secondary" href="#" aria-label="Instagram"
          ><svg class="bi" width="24" height="24" aria-hidden="true">
            <use xlink:href="#instagram"></use></svg
        ></a>
      </li>
      <li class="ms-3">
        <a class="text-body-secondary" href="#" aria-label="Facebook"
          ><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg
        ></a>
      </li>
    </ul>
  </footer> -->
</template>

<style>
.hide-content {
  background-color: rgba(255, 255, 255, 0);
}

#app_content {
  height: calc(100vh - 115px);
}
</style>
