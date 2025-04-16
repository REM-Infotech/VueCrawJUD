<script setup lang="ts">
import { ref } from "vue";
import { $ } from "@plugins/globals";
const modal = ref(false);
</script>

<template>
  <BModal
    data-bs-theme="light"
    v-model="modal"
    ok-only
    ok-title="Fechar"
    title="Mensagem"
    id="ModalMessage"
    @close="
      () => {
        $('#message').text('');
      }
    "
  >
    <p id="message"></p>
  </BModal>
</template>
