<script setup lang="ts">
import { Chart, ChartConfiguration } from "chart.js/auto";
import { onMounted } from "vue";
import ConfigChart from "../resources/configchart";

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.font.family =
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.color = "#292b2c";

onMounted(async () => {
  var ctx1 = (document.getElementById("myAreaChart") as HTMLCanvasElement)?.getContext("2d");

  if (!ctx1) return;

  let config_system;
  let config_bot;

  try {
    ({ config_system, config_bot } = await ConfigChart());
  } catch {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var myLineChart1 = new Chart(
    ctx1,
    config_system as unknown as ChartConfiguration<"line", unknown, unknown>,
  );

  var ctx2 = (document.getElementById("myBarChart") as HTMLCanvasElement)?.getContext("2d");
  if (!ctx2) return;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var myLineChart2 = new Chart(
    ctx2,
    config_bot as unknown as ChartConfiguration<"line", unknown, unknown>,
  );
});
</script>

<template>
  <div class="row">
    <div class="col-xl-6">
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-chart-bar me-1"></i>
          Bar Chart Example
        </div>
        <div class="card-body">
          <canvas id="myBarChart" width="100%" height="40"></canvas>
        </div>
      </div>
    </div>
    <div class="col-xl-6">
      <div class="card mb-4">
        <div class="card-header">
          <i class="fas fa-chart-area me-1"></i>
          Area Chart Example
        </div>
        <div class="card-body text-white bg-white bg-opacity-25">
          <canvas id="myAreaChart" width="100%" height="40"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
