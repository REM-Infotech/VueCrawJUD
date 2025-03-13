<script setup lang="ts">
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server");
});
socket.on("disconnect", () => {
  console.log("Disconnected from server");
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
