<script setup lang="ts">
import { api } from "@/plugins/axios";
import { $ } from "@/plugins/globals";
import {
  faArrowRightFromBracket,
  faGear,
  faHome,
  faKey,
  faListCheck,
  faRobot,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useModal } from "bootstrap-vue-next";
import { RouterLink } from "vue-router";

const handleLogoutClick = (e: Event) => {
  e.preventDefault();
  api.post("/logout").then(() => {
    const { show: show_message } = useModal("ModalMessage");
    $("#message").text("Logout Efetuado com sucesso!");
    show_message();
    sessionStorage.clear();
    localStorage.clear();
  });
};
</script>

<template>
  <div
    data-bs-theme="dark"
    class="offcanvas offcanvas-start bg-dark-purple-transparent"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-body">
      <RouterLink
        :to="{ name: 'index' }"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none rounded p"
      >
        <img class="bi pe-none me-2" src="@/assets/img/crawjud.png" alt="" width="40" />
        <span class="fs-4 fw-bold align-middle">CrawJUD <span class="fs-6 text">v0.1.0</span></span>
      </RouterLink>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item mb-1">
          <RouterLink :to="{ name: 'index' }" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faHome" class="me-2" />
            <span class="text">Home</span>
          </RouterLink>
        </li>
        <li class="nav-item mb-1">
          <RouterLink :to="{ name: 'bot_dashboard' }" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faRobot" class="me-2" />
            <span class="text">Robôs</span>
          </RouterLink>
        </li>
        <li class="nav-item mb-1">
          <RouterLink :to="{ name: 'executions' }" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faTable" class="me-2" />
            <span class="text">Execuções</span>
          </RouterLink>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faListCheck" class="me-2" />
            <span class="text">Tarefas Agendadas</span>
          </a>
        </li>
        <li class="border-top my-3"></li>
        <li class="nav-item mb-1">
          <RouterLink :to="{ name: 'credentials' }" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faKey" class="me-2" />
            <span class="text">Credenciais</span>
          </RouterLink>
        </li>
        <li class="nav-item mb-1">
          <RouterLink :to="{ name: 'config' }" class="nav-link link-body-emphasis">
            <FontAwesomeIcon :icon="faGear" class="me-2" />
            <span class="text">Configurações</span>
          </RouterLink>
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
            src="https://github.com/Robotz213.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong>Robotz213</strong>
        </a>
        <ul class="dropdown-menu text-small shadow bg-dark-purple2">
          <!-- <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li>
            <a class="dropdown-item" href="#">
              <FontAwesomeIcon :icon="faUser" class="me-2" />
              <span class="text">Profile</span>
            </a>
          </li>
          <li><hr class="dropdown-divider" /></li> -->
          <li>
            <a class="dropdown-item" href="#" @click="handleLogoutClick">
              <FontAwesomeIcon :icon="faArrowRightFromBracket" class="me-2" />
              <span class="text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style>
.offcanvas-footer {
  padding: 1rem 1rem;
  border-top: 1px solid #dee2e6;
}
</style>
