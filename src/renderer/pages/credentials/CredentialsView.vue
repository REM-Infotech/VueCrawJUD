<script setup lang="ts">
import NavBarComponent from "@components/NavBarComponent.vue";
import SideBarComponent from "@components/SideBarComponent.vue";
import { onBeforeMount } from "vue";
import { form } from "../../../plugins/formcred";
import ModalCadUsr from "./Components/CredentialsForm.vue";
import TableConfig from "./Components/TableConfig.vue";

onBeforeMount(async () => {
  form.reset();
});
</script>

<template>
  <NavBarComponent />
  <div id="content" class="mt-4 mb-4">
    <SideBarComponent />
    <div>
      <main>
        <BContainer fluid="md" class="px-4">
          <h1 class="text-2xl font-bold mb-4 text-white">Credenciais</h1>
          <TableConfig />
        </BContainer>
      </main>
      <ModalCadUsr />
    </div>
  </div>
</template>
