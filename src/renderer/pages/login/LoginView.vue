<script setup lang="ts">
import NavLogin from "@components/NavLogin.vue";
import { loadingBuzy, onBuzyHidden, setBuzyClick } from "@plugins/animations";
import { api } from "@plugins/axios";
import { $ } from "@plugins/globals";
import { useModal } from "bootstrap-vue-next";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const login = ref("");
const password = ref("");
const remember_me = ref(false);

onMounted(() => {
  const { hide } = useModal("modal-load");
  const { show } = useModal("ModalMessage");
  hide();
  var message = sessionStorage.getItem("message");
  if (message) {
    $("#message").text(message);
    show();
    sessionStorage.removeItem("message");
  }
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  api
    .post(
      "/login",
      {
        login: login.value,
        password: password.value,
        remember_me: remember_me.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        withXSRFToken: true,
        xsrfCookieName: "access_token_cookie",
      },
    )
    .then((response) => {
      const { show: show_message } = useModal("ModalMessage");
      if (response.status === 200) {
        console.log(response);
        const data: Record<string, string> = response.data as Record<string, string>;

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("x-csrf-token", data["x-csrf-token"]);
        localStorage.setItem("admin", data.admin);
        sessionStorage.setItem("message", "Login Efetuado com sucesso!");

        router.push({ name: "bot_dashboard" });
      } else if (response.data.message === "Usuário ou senha incorretos!") {
        $("#message").text("Usuário ou senha incorretos!");
        setTimeout(() => {
          show_message();
        }, 200);
      }
    })
    .catch(() => {
      //
    });
};

onBeforeMount(() => {
  if ($("#app").hasClass("bg-purple")) {
    $("#app").removeClass("bg-purple");
    $("#app").addClass("bg-indigo");
  }
});
</script>

<template>
  <NavLogin />
  <main
    class="form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle"
    data-bs-theme="light"
  >
    <img class="mb-4" src="@renderer/assets/img/crawjud.png" alt="" width="80" height="80" />
    <h1 class="h3 mb-3 text-white fw-normal">CrawJUD v0.1.0</h1>
    <hr />

    <form method="post" @submit="handleSubmit">
      <BFormFloatingLabel label="Login" label-for="login" class="my-2 mb-3">
        <BFormInput id="login" type="text" placeholder="Login" v-model="login" />
      </BFormFloatingLabel>
      <BFormFloatingLabel label="Senha" label-for="password" class="my-2 mb-3">
        <BFormInput id="password" type="password" placeholder="Senha" v-model="password" />
      </BFormFloatingLabel>
      <BFormCheckbox class="text-white fw-bold" v-model="remember_me" :unchecked-value="true"
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
