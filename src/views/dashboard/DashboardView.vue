<script setup lang="ts">
import MainView from "@/components/MainView.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <MainView>
    <div class="container-fluid mt-4 py-4">
      <div class="card">
        <div class="card-header">
          {{ route.name?.toString().toLocaleUpperCase() }}
        </div>
      </div>
    </div>
  </MainView>
</template>
