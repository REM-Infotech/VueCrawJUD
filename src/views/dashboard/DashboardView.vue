<script setup lang="ts">
import MainView from "@/components/MainView.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <MainView>
    <div class="card">{{ route.name }}</div>
  </MainView>
</template>
