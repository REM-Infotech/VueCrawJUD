<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onBeforeMount, onMounted, ref } from "vue";

// Global Components
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
import BotForm from "./components/BotForm.vue";
import { api } from "../../main";
import FormConfig from "./components/FormConfig.ts";

const items = ref<{ system: string; id: number; display_name: string; text: string }[]>([]);

const { ConfigureForm } = FormConfig();

const src_image = (system: string) => {
  if (system == "PROJUDI") {
    return `/client/src/assets/${system.toLowerCase()}.png`;
  }

  return `/client/src/assets/${system.toLowerCase()}.svg`;
};

onBeforeMount(async () => {
  const resp = await api.get("/bots_list", { withCredentials: true });
  items.value = resp.data;
});
</script>

<template>
  <NavBarComponent />
  <div id="content" class="mt-4 mb-4">
    <SideBarComponent />
    <main>
      <BContainer fluid class="px-4">
        <div class="row">
          <div class="col-md-3 p-4 end-0" v-for="item in items" :key="item.id">
            <BCard
              class="bg-secondary bg-opacity-25"
              header-tag="header"
              header-class="bg-secondary text-white  bg-opacity-75"
              footer-tag="footer"
              footer-class="bg-secondary text-white bg-opacity-75"
              tag="article"
            >
              <BCardImg
                :src="src_image(item.system)"
                class="bg-white mb-3 p-3 bg-opacity-75 rounded"
                alt="Image"
                overlay
              />
              <template #header>
                <span class="fw-bold">{{ item.display_name }}</span>
              </template>
              <BCardBody style="height: 6rem" class="bg-white bg-opacity-75 rounded">
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
      </BContainer>
    </main>
  </div>
  <BotForm />
</template>
