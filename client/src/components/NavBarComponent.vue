<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  faMinus,
  faMaximize,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
</script>

<template>
  <nav
    class="navbar navbar-expand-xl navbar-indigo"
    aria-label="Sixth navbar example"
  >
    <div class="container-fluid">
      <a
        class="navbar-brand rounded"
        href="#"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
        >CrawJUD</a
      >
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

      <div class="collapse navbar-collapse" id="navbarsExample06">
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
          <li class="nav-item">
            <a class="nav-link rounded" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" href="#">Link</a>
          </li>
        </ul>
        <!-- <button class="btn btn-secondary m-1" onclick="window.close()">
          <FontAwesomeIcon :icon="faMinus" />
        </button>
        <button class="btn btn-warning m-1">
          <FontAwesomeIcon :icon="faMaximize" />
        </button>
        <button class="btn btn-danger m-1">
          <FontAwesomeIcon :icon="faClose" />
        </button> -->
        <form role="search">
          <input
            class="form-control m-1"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
    </div>
  </nav>
</template>
