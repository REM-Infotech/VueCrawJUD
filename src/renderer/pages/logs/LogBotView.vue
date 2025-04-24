<script setup lang="ts">
import type { TDataLog } from "@/@types/LogTypes";
import { $ } from "@/shared";
import { api } from "@/shared/axios";
import type { AxiosResponse } from "axios";
import { Chart } from "chart.js";
import { io as socketio } from "socket.io-client";
import { useRoute, useRouter } from "vue-router";
import LogsView from "./components/LogsView.vue";
const route = useRoute();

const router = useRouter();
const pid = route.params.pid as string;

const io = socketio("http://localhost:5000/log", {
  extraHeaders: {
    pid: pid,
  },
});

const colors_message = {
  info: "orange",
  error: "RED",
  log: "#d3e3f5",
  success: "#42cf06",
};

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.font.family =
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.color = "#292b2c";

io.on("error", (error) => {
  console.error("Socket error:", error);
});

io.on("log_message", (data: TDataLog) => {
  var messagePid = data.pid;
  if (messagePid == pid) {
    const randomId = `id_${Math.random().toString(36).substring(2, 9)}`;
    const message: string = data.message;
    var typeLog: string = data.type;
    const ul_messages = $("#messages");
    ul_messages.append(
      `<li id="${randomId}" class="fw-bold" style="color: ${colors_message[typeLog as keyof typeof colors_message]}">${message}</li>`,
    );

    setTimeout(() => {
      // updateElements(data);
      document.getElementById(randomId)?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 500);

    if (message.toLowerCase().includes("fim da execução")) {
      api
        .get(`/get_execution/${pid}`)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            const url = response.data.document_url as string;
            $("#download-button").removeClass("disabled");
            $("#download-button").removeClass("btn-outline-success");
            $("#download-button").addClass("btn-success");
            $("#download-button").attr("href", url);
          }
        })
        .catch(() => {
          router.push({ name: "dashboard" });
        });
    }
  }
});
</script>

<template>
  <BContainer fluid class="px-4" data-bs-theme="dark">
    <BCard header-class="bg-dark">
      <template #header> teste </template>
      <BRow style="height: 65vh">
        <BCol lg="6" class="p-3">
          <LogsView />
        </BCol>
        <BCol lg="6"> </BCol>
      </BRow>
    </BCard>
  </BContainer>
</template>

<style>
.inner-scroll {
  overflow-y: hidden !important;
}
</style>
