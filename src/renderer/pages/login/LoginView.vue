<script setup lang="ts">
import { tokenStore } from "@/store/tokenAuthStore";
import { loadingBuzy, onBuzyHidden, setBuzyClick } from "@shared/animations";
import { api } from "@shared/axios";
import { $ } from "@shared/index";
import type { LoginResponse } from "LoginResponse";
import { useModal } from "bootstrap-vue-next";
import { onBeforeMount, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const { show: show_message } = useModal("ModalMessage");
const FormLogin = reactive({
  login: "",
  password: "",
  remember_me: false,
});

const authStore = tokenStore();

async function handleSubmit(e: Event) {
  e.preventDefault();

  let response: LoginResponse;

  try {
    response = await api.post(
      "/login",
      {
        login: FormLogin.login,
        password: FormLogin.password,
        remember_me: FormLogin.remember_me,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 200) {
      authStore.save(response);
      router.push({ name: "dashboard" });
    } else if (response.data.message === "Usuário ou senha incorretos!") {
      $("#message").text("Usuário ou senha incorretos!");
      setTimeout(() => {
        show_message();
      }, 200);
    }
  } catch {
    return;
  }
}

onBeforeMount(() => {
  if (authStore.isLogged()) {
    router.push({ name: "dashboard" });
  }

  if ($("#app").hasClass("bg-purple")) {
    $("#app").removeClass("bg-purple");
    $("#app").addClass("bg-indigo");
  }
});
</script>

<template>
  <main
    class="form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle"
    data-bs-theme="light"
  >
    <img class="mb-4" src="@renderer/assets/img/crawjud.png" alt="" width="80" height="80" />
    <h1 class="h3 mb-3 text-white fw-normal">CrawJUD v0.1.0</h1>
    <hr />

    <form method="post" @submit="handleSubmit">
      <BFormFloatingLabel label="Login" label-for="login" class="my-2 mb-3">
        <BFormInput id="login" type="text" placeholder="Login" v-model="FormLogin.login" />
      </BFormFloatingLabel>
      <BFormFloatingLabel label="Senha" label-for="password" class="my-2 mb-3">
        <BFormInput
          id="password"
          type="password"
          placeholder="Senha"
          v-model="FormLogin.password"
        />
      </BFormFloatingLabel>
      <BFormCheckbox
        class="text-white fw-bold"
        v-model="FormLogin.remember_me"
        :unchecked-value="true"
        >Salvar Credenciais</BFormCheckbox
      >
      <hr />
      <BOverlay
        :show="loadingBuzy"
        rounded
        opacity="0.6"
        spinner-small
        spinner-variant="primary"
        class="d-inline-block"
        @hidden="onBuzyHidden"
      >
        <BButton
          type="button"
          ref="buzyButton"
          :disabled="loadingBuzy"
          variant="primary"
          @click="
            (e) => {
              setBuzyClick(e);
            }
          "
        >
          Login
        </BButton>
      </BOverlay>
    </form>
  </main>
</template>
