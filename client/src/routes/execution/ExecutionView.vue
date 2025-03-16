<script setup lang="ts">
// import { io } from "socket.io-client";
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
import TableComponent from "./components/TableComponent.vue";
import { useModal } from "bootstrap-vue-next";
import jQuery from "jquery";
import { onMounted } from "vue";

const $ = jQuery;

// onMounted(() => {
//   const socket = io("http://localhost:5000/log");
//   socket.on("connect", () => {
//     console.log("Connected to server");
//   });
//   socket.on("disconnect", () => {
//     console.log("Disconnected from crawjud");
//   });
// });

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
  <div id="content" class="mt-4 mb-4">
    <SideBarComponent />
    <div>
      <main>
        <BContainer fluid class="px-4">
          <TableComponent />
        </BContainer>
      </main>
    </div>
  </div>
</template>
