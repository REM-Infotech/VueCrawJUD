<script setup lang="ts">
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useModal } from "bootstrap-vue-next";
import { current_action, form } from "../resources/formusr";
import { api } from "../../../main";
import { computed, ref } from "vue";
const { show: show_load, hide: hide_load } = useModal("modal-load");

const state_modal = ref(false);

const state_email = computed(() => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(form.email);
});

async function submitForm(e: Event) {
  show_load();
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("login", form.login);
  formData.append("email", form.email);
  formData.append("password", form.password);

  if (current_action.value.includes("Editar")) {
    formData.append("id", form.id.toString());
    formData.append("method_request", "UPDATE");
  } else if (current_action.value.includes("Cadastrar")) {
    formData.append("method_request", "INSERT");
  }

  api
    .post("/users", formData, {
      withXSRFToken: true,
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  setTimeout(() => {
    hide_load();
  }, 500);
  state_modal.value = false;
}
</script>

<template>
  <BModal
    @hide="form.reset()"
    no-footer
    id="ModalFormUsr"
    data-bs-theme="dark"
    size="xl"
    centered
    class="text-white"
    :title="current_action"
  >
    <div>
      <BForm id="FormUsr" @submit="submitForm" v-model="state_modal">
        <BFormFloatingLabel class="mb-4" label-for="floatingName" label="Nome do Usuário">
          <BFormInput
            id="floatingName"
            v-model="form.name"
            placeholder="Nome do Usuário"
            required
          />
        </BFormFloatingLabel>
        <BFormFloatingLabel class="mb-4" label-for="floatingEmail" label="E-mail">
          <BFormInvalidFeedback id="input-live-feedback"
            >Insira um email válido</BFormInvalidFeedback
          >
          <BFormInput
            v-model.trim="form.email"
            :state="state_email"
            id="floatingEmail"
            type="email"
            placeholder="E-mail"
            required
          />
        </BFormFloatingLabel>
        <BFormFloatingLabel class="mb-4" label-for="floatingLogin" label="Login">
          <BFormInput id="floatingLogin" v-model="form.login" placeholder="Login" required />
        </BFormFloatingLabel>
        <BFormFloatingLabel class="mb-4" label-for="floatingPassword" label="Senha:">
          <BFormInput
            type="password"
            id="floatingPassword"
            v-model="form.password"
            placeholder="Senha"
            required
          />
        </BFormFloatingLabel>
        <hr />
        <div class="d-grid gap-2 mt-5 mb-2">
          <BButton type="submit" variant="outline-success">
            <span><FontAwesomeIcon class="me-2" :icon="faFloppyDisk" /></span>
            <em class="fw-bold">Salvar</em></BButton
          >
        </div>
      </BForm>
    </div>
  </BModal>
</template>
