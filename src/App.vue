<script setup lang="ts">
import { RouterView } from "vue-router";
import ChoseThemeView from "./components/ChoseThemeView.vue";
import LoginView from "./views/auth/LoginView.vue";
</script>

<template>
  <LoginView />
  <ChoseThemeView />
</template>
