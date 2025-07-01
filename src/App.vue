<script setup lang="ts">
import { watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import MainView from "./components/MainView.vue";
import { mainSocket } from "./main";
const router = useRouter();
const route = useRoute();

watch(route, (newRoute) => {
  if (newRoute.meta.require_auth) {
    mainSocket.emit("check-token", {}, (isValid: boolean) => {
      if (!isValid) {
        router.push({ name: "login" });
      }
    });
  }
});
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <MainView v-if="route.name !== 'login'">
        <Transition name="fade" mode="out-in">
          <div :key="route.name" style="width: 100%; height: 100%">
            <component :is="Component" />
          </div>
        </Transition>
      </MainView>
      <div v-else style="width: 100%; height: 100%">
        <component :is="Component" :key="route.name" />
      </div>
    </Transition>
  </RouterView>
  <BModal id="ModalMessage"> Bem vindo @ </BModal>
</template>
