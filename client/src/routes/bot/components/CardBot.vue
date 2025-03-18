<script setup lang="ts">
import FormConfig from "./FormConfig.ts";
const { ConfigureForm } = FormConfig();

import { onBeforeMount, ref } from "vue";
import { api } from "../../../main.ts";

const items = ref<{ system: string; id: number; display_name: string; text: string }[]>([]);

onBeforeMount(async () => {
  const resp = await api.get("/bots_list");
  items.value = resp.data;
});

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
            @click="ConfigureForm(item)"
            ><em>Acessar Robô</em></BButton
          >
        </template>
      </BCard>
    </div>
  </div>
</template>
