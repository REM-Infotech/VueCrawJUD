<script setup lang="ts">
import { computed, ref } from "vue";
import "../../assets/main.css";
import EyeView from "./components/EyeView.vue";
import { loginDiv, loginInput } from "./components/styledElements";

const active = ref(false);
const computedType = computed(() => (!active.value ? "password" : "text"));
</script>

<template>
  <div class="d-flex flex-column" style="height: 100%">
    <div class="d-flex mt-auto mb-auto justify-content-center align-items-center">
      <div class="card d-flex flex-column p-3">
        <div class="card-body">
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
