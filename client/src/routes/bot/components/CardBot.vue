<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { api } from "../../../main.ts";
import { useRouter } from "vue-router";
import { $ } from "../../../main.ts";
import { useModal } from "bootstrap-vue-next";
const router = useRouter();
const items = ref<{ system: string; id: number; display_name: string; text: string }[]>([]);

onBeforeMount(async () => {
  const { show: show_message } = useModal("ModalMessage");

  api
    .get("/bots_list")
    .then((resp) => {
      items.value = resp.data;
    })
    .catch((response) => {
      // check if response.status is 4** error
      if (response.response.status >= 400 && response.response.status < 500) {
        $("#message").text("Sessão expirada! Faça login novamente.");
        router.push({ name: "login" });
        show_message();
      }
    });
});

const current_bot = (item) => {
  sessionStorage.setItem("current_bot", JSON.stringify(item));
};

const src_image = (system: string) => {
  if (system == "PROJUDI") {
    return `/client/src/assets/${system.toLowerCase()}.png`;
  }

  return `/client/src/assets/${system.toLowerCase()}.svg`;
};
</script>

<template>
  <div class="row">
    <div class="col-md-3 p-4 end-0" v-for="item in items" :key="item.id">
      <BCard :img-src="src_image(item.system)" data-bs-theme="dark" tag="article">
        <template #header>
          <span class="fw-bold">{{ item.display_name }}</span>
        </template>
        <BCardBody style="height: 6rem" class="">
          <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
        </BCardBody>

        <template #footer>
          <BButton
            class="d-grid gap-2"
            v-b-modal.ModalFormBot
            variant="success"
            @click="current_bot(item)"
            ><em>Acessar Robô</em></BButton
          >
        </template>
      </BCard>
    </div>
  </div>
</template>
