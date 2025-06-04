<script setup lang="ts">
import { faAngleRight, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const listItems = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
</script>

<template>
  <div class="row">
    <div class="col-md-3">
      <div class="card" style="height: 75dvh">
        <div class="card-header">Listagem de robôs</div>
        <div class="card-body">
          <div class="card-title fs-5">Categorias de robôs</div>
        </div>
      </div>
    </div>
    <div class="col-9 row">
      <div class="col-xl-3 col-md-6" v-for="item in listItems" :key="item">
        <div class="card bg-body-tertiary text-white mb-4">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="text-card d-flex flex-column">
              <span class="fs-6 text-body-secondary">Falhas nas últimas 24h</span>
              <span class="fs-3 fw-bold text-danger">3</span>
            </div>
            <div class="fw-bold bg-danger p-3 rounded rounded-4 bg-opacity-50">
              <FontAwesomeIcon :icon="faWarning" size="xl" />
            </div>
          </div>
          <div class="card-footer d-flex align-items-center justify-content-between">
            <a class="small text-white stretched-link" href="#">Mais detalhes</a>
            <div class="small text-white">
              <FontAwesomeIcon :icon="faAngleRight" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
