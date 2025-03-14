<template>
  <main
    class="form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle"
    data-bs-theme="light"
  >
    <img class="mb-4" src="@/assets/crawjud.png" alt="" width="80" height="80" />
    <h1 class="h3 mb-3 text-white fw-normal">CrawJUD v0.1.0</h1>
    <hr />
    <form method="post" @submit="handleSubmit">
      <div class="form-floating mb-3">
        <input type="text" name="" id="login" class="form-control" />
        <label for="login">Login</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" name="" id="password" class="form-control" />
        <label for="password">Password</label>
      </div>
      <div class="form-check">
        <input type="checkbox" name="remember_me" id="gridCheck" class="form-check-input" />
        <label for="gridCheck" class="form-check-label text-white">Remember Me</label>
      </div>
      <hr />
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useModal } from "bootstrap-vue-next";
import { onMounted } from "vue";
import { Router } from "vue-router";
import jQuery from "jquery";
import { api } from "../../main";
const router = useRouter();
const { show } = useModal("ModalMessage");
const $ = jQuery;
onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { show, hide, modal } = useModal("ModalMessage");
  var message = sessionStorage.getItem("message");
  if (message) {
    $("#message").text(message);
    show();
    sessionStorage.removeItem("message");
  }
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  authenticate(router);
};

onBeforeMount(() => {
  if ($("#app").hasClass("bg-purple")) {
    $("#app").removeClass("bg-purple");
    $("#app").addClass("bg-indigo");
  }
});

async function authenticate(router: Router) {
  try {
    const response = await api.post("/auth", {
      login: $("#login").val(),
      password: $("#password").val(),
      remember_me: $("#gridCheck").is(":checked"),
    });

    if (response.status === 200) {
      const data: Record<string, string> = response.data as Record<string, string>;
      sessionStorage.setItem("token", data.token);

      sessionStorage.setItem("message", "Login Efetuado com sucesso!");

      router.push({ name: "index" });
      if ($("#app").hasClass("bg-indigo")) {
        $("#app").removeClass("bg-indigo");
        $("#app").addClass("bg-purple");
      }
    }
  } catch (error) {
    console.error("Login failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    $("#message").text("Erro ao realizar login");
    show();

    console.error(error);
  }
}
</script>
