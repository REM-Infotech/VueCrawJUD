<script setup lang="ts">
import { onMounted } from "vue";
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
import TableComponent from "./components/TableComponent.vue";
import { io } from "socket.io-client";
import { useModal } from "bootstrap-vue-next";
import jQuery from "jquery";

const $ = jQuery;
onMounted(() => {
  const socket = io("http://localhost:5000/log");
  socket.on("connect", () => {
    console.log("Connected to server");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
});

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { show, hide, modal } = useModal("ModalMessage");
  var message = sessionStorage.getItem("message");
  if (message) {
    $("#message").text(message);
    show();
    sessionStorage.removeItem("message");
  }
});
</script>

<template>
  <NavBarComponent />
  <div id="content">
    <SideBarComponent />
    <main>
      <BContainer fluid class="px-4">
        <div class="card mt-4 mb-4">
          <div class="card-header">
            <h1 class="mb-3">Execuções</h1>
          </div>
          <div class="card-body bg-warning bg-opacity-75">
            <TableComponent />
          </div>
        </div>
      </BContainer>
    </main>
  </div>
</template>
