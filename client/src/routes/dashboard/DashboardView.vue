<script setup lang="ts">
import { onMounted } from "vue";
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
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
  const { show, hide, modal } = useModal("ExampleModal");
  var message = sessionStorage.getItem("message");
  if (message) {
    $("#ExampleModal").text(message);
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
      <div class="container-fluid mt-4 px-5">
        <div class="card">
          <div class="card-header">
            <h3>Dashboard</h3>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
