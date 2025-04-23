<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import projudiicon from "@renderer/assets/img/projudi.png";
import iconbot from "@renderer/assets/svg/crawjud2.svg";
import { botStore } from "@store/botsStore";
const items = ref<{ system: string; id: number; display_name: string; text: string }[]>([]);
const storebot = botStore();
onBeforeMount(async () => {
  if (storebot.bots.length === 0) {
    await storebot.load();
  }
  items.value = storebot.bots;
});
</script>

<template>
  <div class="row overflow-y-auto">
    <div class="col-md-3 p-4 end-0" v-for="item in items" :key="item.id">
      <BCard v-if="item.system.toLowerCase() === 'projudi'" data-bs-theme="dark" tag="article">
        <template #header>
          <span class="fw-bold">{{ item.display_name }}</span>
        </template>
        <template #img>
          <img :src="projudiicon" alt="" />
        </template>
        <BCardBody style="height: 6rem" class="overflow-y-auto">
          <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
        </BCardBody>
        <template #footer>
          <div class="dropdown">
            <BButton
              class="btn me-2 fw-bold dropdown-toggle"
              variant="outline-success"
              @click="
                () => {
                  storebot.loadCurrentBot(item);
                }
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <em>Acessar Robô</em>
            </BButton>
            <ul class="dropdown-menu mt-2">
              <li>
                <a class="dropdown-item" href="#" v-b-modal.ModalFormBot>
                  <em>Execução normal</em>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <em>Execução agendada</em>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </BCard>
      <BCard v-else data-bs-theme="dark" tag="article">
        <template #header>
          <span class="fw-bold">{{ item.display_name }}</span>
        </template>
        <BCardBody style="height: 6rem" class="overflow-y-auto">
          <span style="height: 50rem">{{ item.text }} </span>
        </BCardBody>
        <template #img>
          <img :src="iconbot" alt="" />
        </template>
        <template #footer>
          <div class="dropdown">
            <BButton
              class="btn me-2 fw-bold dropdown-toggle"
              variant="outline-success"
              @click="
                () => {
                  storebot.loadCurrentBot(item);
                }
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <em>Acessar Robô</em>
            </BButton>
            <ul class="dropdown-menu mt-2">
              <li>
                <a class="dropdown-item" href="#" v-b-modal.ModalFormBot>
                  <em>Execução normal</em>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <em>Execução agendada</em>
                </a>
              </li>
            </ul>
          </div>
        </template>
      </BCard>
    </div>
  </div>
</template>
