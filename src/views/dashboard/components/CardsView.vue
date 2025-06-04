<script setup lang="ts">
import {
  faAngleRight,
  faCheckCircle,
  faPlayCircle,
  faRobot,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<template>
  <div class="row">
    <div class="col-xl-3 col-md-6">
      <div class="card bg-body-tertiary text-white mb-4">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="text-card d-flex flex-column">
            <span class="fs-6 text-body-secondary">Total de bots contratados</span>
            <span class="fs-3 fw-bold">25</span>
          </div>
          <div class="icon bg-primary p-3 rounded rounded-4 bg-opacity-50">
            <FontAwesomeIcon :icon="faRobot" size="2xl" />
          </div>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-between">
          <a class="small text-white stretched-link fw-semibold" href="#">Mais detalhes</a>
          <div class="small text-white">
            <FontAwesomeIcon :icon="faAngleRight" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6">
      <div class="card bg-body-tertiary text-white mb-4">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="text-card d-flex flex-column">
            <span class="fs-6 text-body-secondary">Execuções Ativas</span>
            <span class="fs-3 fw-bold">8</span>
          </div>
          <div class="icon bg-warning p-3 rounded rounded-4 bg-opacity-50">
            <FontAwesomeIcon :icon="faPlayCircle" size="xl" />
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
    <div class="col-xl-3 col-md-6">
      <div class="card bg-body-tertiary text-white mb-4">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="text-card d-flex flex-column">
            <span class="fs-6 text-body-secondary">Concluídas Hoje</span>
            <span class="fs-3 fw-bold text-success">142</span>
          </div>
          <div class="icon bg-success p-3 rounded rounded-4 bg-opacity-50">
            <FontAwesomeIcon :icon="faCheckCircle" size="xl" />
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
    <div class="col-xl-3 col-md-6">
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
</template>
