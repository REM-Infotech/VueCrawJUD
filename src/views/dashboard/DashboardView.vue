<script setup lang="ts">
import MainView from "@/components/MainView.vue";
import CardsView from "./components/CardsView.vue";
import TableView from "./components/TableView.vue";
</script>

<template>
  <MainView>
    <h1 class="mt-4 fw-bold text-body-secondary">Dashboard</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item active">Visão geral do sistema</li>
    </ol>
    <CardsView />
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table me-1"></i>
        DataTable Example
      </div>
      <div class="card-body">
        <TableView />
      </div>
    </div>
  </MainView>
</template>
