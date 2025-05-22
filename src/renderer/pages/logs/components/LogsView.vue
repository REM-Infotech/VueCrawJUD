<script setup lang="ts">
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { LogsStore } from "@store/logsStore";
import type { TLog } from "LogTypes";
import { ref, watch } from "vue";

const logsbot = ref<TLog[]>([]);
const storeLogs = LogsStore();

watch(storeLogs.logs, (newLogs) => {
  logsbot.value = newLogs;
});
</script>

<template>
  <div class="rounded-2 border border-1 border-secondary">
    <BCardHeader class="bg-dark">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-5">
          <span class="fw-semibold me-3">
            <i class="fas fa-chart-pie"></i>
            <FontAwesomeIcon :icon="faPieChart" />
          </span>
          <span class="fw-semibold">Logs </span>
        </div>
      </div>
    </BCardHeader>
    <BCardBody class="bg-black" style="height: 50vh">
      <div class="container-fluid">
        <ul class="list-group list-group-flush over overflow-hidden">
          <li
            v-for="(log, index) in logsbot"
            :key="index"
            class="fw-bold"
            :id="log.id"
            :style="{ color: log.color }"
          >
            {{ log.message }}
          </li>
        </ul>
      </div>
    </BCardBody>
    <BCardFooter class="d-flex gap-5">
      <span id="status">Status: Em Execução</span>
      <span>Total: </span>
    </BCardFooter>
  </div>
</template>
