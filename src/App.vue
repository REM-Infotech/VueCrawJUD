<script setup lang="ts">
import { RouterView } from "vue-router";
import MainView from "./components/MainView.vue";
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <MainView v-if="route.name !== 'login'">
        <component :is="Component" :key="route.name" />
      </MainView>
      <div v-else style="width: 100%; height: 100%">
        <component :is="Component" :key="route.name" />
      </div>
    </Transition>
  </RouterView>
</template>
