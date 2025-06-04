<script setup lang="ts">
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import CardsView from "./components/CardsView.vue";
</script>

<template>
  <h1 class="mt-4 fw-bold text-body-secondary">Dashboard</h1>
  <ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Visão geral do sistema</li>
  </ol>
  <CardsView />
  <div class="row">
    <div class="col-8">
      <div class="card mb-4">
        <div class="card-header d-flex">
          <span class="title align-items-center d-flex">
            <IBiPieChartFill />
            <span class="ms-1"> Grafico de Execuções </span>
          </span>
          <div class="ms-auto">
            <input class="form-control" placeholder="Filtre aqui.." type="text" />
          </div>
        </div>
        <div class="card-body"></div>
      </div>
    </div>
    <div class="col-4">
      <div class="card mb-4">
        <div class="card-header d-flex">
          <span class="title align-items-center d-flex">
            <FontAwesomeIcon :icon="faWarning" />
            <span class="ms-1"> Alertas Recentes</span>
          </span>
          <div class="ms-auto">
            <input class="form-control" placeholder="Filtre aqui.." type="text" />
          </div>
        </div>
        <div class="card-body"></div>
      </div>
    </div>
  </div>
</template>
