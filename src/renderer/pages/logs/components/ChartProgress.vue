<script setup lang="ts">
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { LogsStore } from "@store/logsStore";
import { Chart } from "chart.js";
import { onMounted, ref, watch } from "vue";

const countLogs = ref<number[]>([0, 0, 0]);
const storeLogs = LogsStore();

watch(storeLogs.logs, () => {
  countLogs.value = [storeLogs.remaining, storeLogs.success, storeLogs.errors];
});

onMounted(() => {
  const ctx = (document.getElementById("LogsBotChart") as HTMLCanvasElement)?.getContext("2d");
  if (!ctx) return;
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["RESTANTES", "SUCESSOS", "ERROS"],
      datasets: [
        {
          data: [0.1, 0.1, 0.1],
          backgroundColor: ["#0096C7", "#42cf06", "#FF0000"],
        },
      ],
    },
  });
});
</script>

<template>
  <div
    class="card mb-4 fixed-height-card border-4 rounded rounded-4 border-black"
    style="height: 35rem"
  >
    <div class="card-header">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-5">
          <span class="fw-semibold me-3">
            <i class="fas fa-chart-pie"></i>
            <FontAwesomeIcon :icon="faPieChart" />
          </span>
          <span class="fw-semibold">Logs </span>
        </div>
      </div>
    </div>
    <div class="card-body bg-success bg-opacity-50">
      <div class="container-fluid d-grid justify-content-xl-center w-50">
        <canvas id="LogsBotChart"></canvas>
      </div>
    </div>
    <div class="card-footer small text-muted fw-semibold">
      <span id="remaining">Restantes: {{ countLogs[0] }} </span> |
      <span id="success">Sucessos: {{ countLogs[1] }} </span> |
      <span id="errors">Erros: {{ countLogs[2] }} </span>
    </div>
  </div>
</template>
