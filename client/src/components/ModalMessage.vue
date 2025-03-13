<script setup lang="ts">
import { ref } from "vue";

const rogrammaticModal = ref(false);
</script>

<template>
  <BModal v-model="rogrammaticModal" title="Hello, World!" id="ExampleModal"></BModal>
</template>
