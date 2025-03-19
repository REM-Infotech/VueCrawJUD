<script setup lang="ts">
import { io } from "socket.io-client";

import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { Chart } from "chart.js/auto";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $ } from "../../main";

const route = useRoute();
const pid = route.params.pid as string;

const socket = io("http://localhost:5000/log", {
    extraHeaders: {
        pid: pid,
    },
});

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.font.family =
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.color = "#292b2c";

onMounted(() => {
    var ctx = (document.getElementById("LogsBotChart") as HTMLCanvasElement)?.getContext("2d");
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

socket.on("disconnect", () => {
    console.log("Disconnected from crawjud");
});
socket.on("connect", function () {
    socket.emit("join", { pid: pid });
});

socket.on("log_message", function (data) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var messagePid = data.pid;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var pos = parseInt(data.pos);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var typeLog = data.type;

    console.log(data);
});

const stop_execut = () => {
    console.log("ok");
};
</script>

<template>
    <NavBarComponent />
    <div id="content" class="mt-4 mb-4">
        <SideBarComponent />
        <div>
            <main>
                <BContainer fluid class="px-4">
                    <div class="card">
                        <div class="card-header">
                            <div class="d-flex gap-3">
                                <div
                                    class="justify-content-xxl-end align-middle me-auto text-center"
                                >
                                    <h4>Estatisticas</h4>
                                </div>
                                <div class="justify-content-xxl-end">
                                    <a
                                        class="btn btn-outline-success disabled me-2"
                                        aria-disabled="true"
                                        id="download-button"
                                        href="#"
                                        >Baixar Documento</a
                                    >
                                    <button
                                        type="button"
                                        class="btn btn-warning"
                                        @click="stop_execut()"
                                    >
                                        Encerrar Execução
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body bg-warning bg-opacity-75">
                            <div class="row">
                                <div class="col-xl-6 col-md-6">
                                    <div
                                        class="card fixed-height-card border-0"
                                        style="height: 35rem"
                                    >
                                        <div class="card-header">
                                            <div
                                                class="row justify-content-between align-items-center"
                                            >
                                                <div class="col-md-5">
                                                    <span class="fw-semibold me-3">
                                                        <i class="fas fa-chart-pie"></i>
                                                        <FontAwesomeIcon :icon="faPieChart" />
                                                    </span>
                                                    <span class="fw-semibold">Logs </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body bg-black overflow-auto">
                                            <div class="container-fluid">
                                                <div class="overflow-y-scroll">
                                                    <ul
                                                        id="messages"
                                                        class="list-group list-group-flush"
                                                    ></ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer small text-muted fw-semibold">
                                            <span id="status">Status: Em Execução | Total: </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-md-6">
                                    <div class="card mb-4 fixed-height-card" style="height: 35rem">
                                        <div class="card-header">
                                            <div
                                                class="row justify-content-between align-items-center"
                                            >
                                                <div class="col-md-5">
                                                    <span class="fw-semibold me-3">
                                                        <i class="fas fa-chart-pie"></i>
                                                        <FontAwesomeIcon :icon="faPieChart" />
                                                    </span>
                                                    <span class="fw-semibold">Logs </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div
                                                class="container-fluid d-grid justify-content-xl-center w-50"
                                            >
                                                <canvas id="LogsBotChart"></canvas>
                                            </div>
                                        </div>
                                        <div class="card-footer small text-muted fw-semibold">
                                            <span id="remaining">Restantes: -.- </span> |
                                            <span id="success">Sucessos: -.- </span> |
                                            <span id="errors">Erros: -.- </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-secondary">
                            <div class="container-fluid mt-2 mb-2">
                                <div
                                    id="progress_bar"
                                    class="progress"
                                    role="progressbar"
                                    aria-label="Info example"
                                    aria-valuenow="0"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div
                                        id="progress_info"
                                        class="progress-bar bg-info text-dark"
                                        style="width: 0%"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BContainer>
            </main>
        </div>
    </div>
</template>
