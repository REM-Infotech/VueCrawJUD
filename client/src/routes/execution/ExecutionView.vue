<template>
  <NavBarComponent />
  <div id="content">
    <SideBarComponent />
    <BOverlay
      :show="loadingBuzy"
      spinner-variant="primary"
      spinner-type="grow"
      spinner-small
      rounded="sm"
      class="mt-4 p-4"
      @hidden="onBuzyHidden"
    >
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
      <BButton ref="buzyButton" :disabled="loadingBuzy" variant="primary" @click="setBuzyClick">
        Do something
      </BButton>
    </BOverlay>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
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

let timeout: ReturnType<typeof setTimeout> | null = null;

const loadingBuzy = ref(false);
const buzyButton = ref<HTMLElement | null>(null);

const clearTimer = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
};
const setTimer = (callback) => {
  clearTimer();
  timeout = setTimeout(() => {
    clearTimer();
    callback();
  }, 5000);
};
const setBuzyClick = () => {
  loadingBuzy.value = true;
  // Simulate an async request
  setTimer(() => {
    loadingBuzy.value = false;
  });
};

const onBuzyHidden = () => {
  // Return focus to the button once hidden
  //buzyButton.focus()
};
</script>
