<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHome, faTable } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from "vue-router";
import { logout } from "../routes/login/auth";
import { useRouter } from "vue-router";

// import { Modal } from "bootstrap";
// import { onBeforeMount, onMounted } from "vue";

// onMounted(() => {
//   const myModal = new Modal(document.querySelector("#exampleModal"));
// });

// function togleModal() {
//   const myModal = $("#exampleModal");

//   console.log("clicked!");
//   myModal.hide();
// }
const router = useRouter();

const handleLogoutClick = (e: Event) => {
  e.preventDefault();
  logout(router);
};
</script>

<template>
  <div
    class="offcanvas offcanvas-start bg-dark-purple"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
    data-bs-theme="dark"
  >
    <div class="offcanvas-body">
      <RouterLink
        :to="{ name: 'index' }"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none rounded p"
      >
        <img class="bi pe-none me-2" src="../assets/crawjud.png" alt="" width="40" />
        <span class="fs-4">CrawJUD</span>
      </RouterLink>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item mb-1">
          <a href="#" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faHome" class="me-2" />
            <span class="text">Home</span>
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faTable" class="me-2" />
            <span class="text">Dashboard</span>
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link link-body-emphasis">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#table"></use>
            </svg>
            Orders
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link link-body-emphasis">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#grid"></use>
            </svg>
            Products
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link link-body-emphasis">
            <svg class="bi pe-none me-2" width="16" height="16">
              <use xlink:href="#people-circle"></use>
            </svg>
            Customers
          </a>
        </li>
      </ul>
    </div>
    <footer class="offcanvas-footer">
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
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
          <strong>mdo</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#" @click="handleLogoutClick">Logout</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.offcanvas-footer {
  padding: 1rem 1rem;
  border-top: 1px solid #dee2e6;
}
</style>
