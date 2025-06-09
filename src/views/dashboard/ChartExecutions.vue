<!-- filepath: /home/nicholas-silva/VueCrawJUD/src/views/dashboard/ChartExecutions.vue -->
<template>
  <div class="canvaRender">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (canvasRef.value) {
    new Chart(canvasRef.value, {
      type: "bar",
      data: {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            label: "Execuções",
            data: [10, 20, 15, 35, 10, 20, 15, 35, 85, 27, 57, 28],
            backgroundColor: ["#42b983", "#35495e", "#ff6384"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: "Execuções por mês" },
        },
      },
    });
  }
});
</script>

<style lang="css" scoped>
.canvaRender {
  width: calc(100dvw - 800px);
  min-width: calc(100dvw - 800px);
  height: calc(90dvh - 320px);
  transition: 1s;
}
</style>
