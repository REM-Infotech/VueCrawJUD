<script setup lang="ts">
interface TypeCards {
  [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colorCards: TypeCards = {
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-danger",
  danger: "bg-danger",
};

const renderCards: TypeCards[] = [
  {
    message: "Mensagem de aviso Teste",
    type: "warning",
  },
  {
    message: "Mensagem de Successo teste",
    type: "success",
  },
];
</script>

<template>
  <div
    :class="['card', 'bg-body-tertiary', 'cardAlerts', card.type]"
    v-for="(card, index) in renderCards"
    :key="index"
  >
    <div class="card-body">
      {{ card.message }}
    </div>
  </div>
</template>

<style lang="css" scoped>
.cardAlerts {
  border-left: 6px solid transparent;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  width: calc(100dvw - 1525px);
  height: 160px;
}

.cardAlerts.warning {
  border-left-color: var(--bs-warning);
}

.cardAlerts.success {
  border-left-color: var(--bs-success);
}
</style>
