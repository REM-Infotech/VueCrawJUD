<script setup lang="ts">
import { ref } from "vue";
import { BModal } from "bootstrap-vue-next";
const programmaticModal = ref(false);
</script>

<template>
  <BModal v-model="programmaticModal" title="Hello, World!" id="ExampleModal">
    <BButton @click="programmaticModal = false">Fechar</BButton>
  </BModal>
</template>
