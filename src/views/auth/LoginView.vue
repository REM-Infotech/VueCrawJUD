<script setup lang="ts">
import { computed, ref } from "vue";
import "../../assets/main.css";
import EyeView from "./components/EyeView.vue";
import { loginDiv, loginInput } from "./components/styledElements";

const active = ref(false);
const computedType = computed(() => (!active.value ? "password" : "text"));
</script>

<template>
  <div class="d-flex flex-column justify-content-center" style="height: 100%">
    <div class="mt-auto mb-auto p-3">
      <div class="card ms-auto me-auto" style="width: 35%">
        <div class="card-body d-flex flex-column align-items-center justify-content-center">
          <loginDiv class="mb-3">
            <loginInput id="emailInput" placeholder="Usuário" />
          </loginDiv>
          <loginDiv class="mb-3">
            <loginInput
              :class="{ visible: active, hidden: !active }"
              id="password"
              placeholder="senha"
              :type="computedType"
            />
            <EyeView type="button" @click="active = !active" />
          </loginDiv>
        </div>
      </div>
    </div>
    <div class="bg-dark">teste</div>
  </div>
</template>
