<script setup lang="ts">
import "@/assets/css/main.css";
import { useRouter } from "vue-router";

import logoSystem from "@/assets/img/iconlogo.png";
import type { LoginForm } from "@/types/forms";
import { reactive } from "vue";
import { handleAuthentication } from "./handlerAuthentication";
const router = useRouter();

const FormLogin: LoginForm = reactive({
  email: "",
  password: "",
  remember_me: false,
});

async function handleSubmit(event: Event) {
  event.preventDefault();

  const isAuth = await handleAuthentication(FormLogin);
  if (isAuth) {
    router.push({ name: "dashboard" });
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-content-center" style="height: 100%">
    <div class="mt-auto mb-auto p-3">
      <form
        class="card bg-body-tertiary bg-opacity-50 ms-auto me-auto d-flex flex-column gap-2 p-5"
        style="width: 35%"
        @submit="handleSubmit"
      >
        <div class="header-login d-flex flex-column mb-4 gap-2">
          <img class="align-self-between mb-2" :src="logoSystem" alt="" width="98px" />
          <div class="brand">
            <span class="fs-3 align-self-center"><small> CrawJUD </small></span>
            <span class="fw-semibold fs-5 align-self-center">
              <em> v2.0 </em>
            </span>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            v-model="FormLogin.email"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            v-model="FormLogin.password"
          />
          <label for="floatingPassword">Password</label>
        </div>

        <div class="d-flex flex-column mt-4">
          <hr />
          <button id="loginButton" class="btn" type="submit">Login</button>
        </div>
      </form>
    </div>
    <div class="bg-dark">teste</div>
  </div>
</template>

<style lang="css" scoped>
#loginButton {
  background-color: var(--color-seance-700);
  transition: 0.5s;
  &:hover {
    background-color: var(--color-seance-900);
    font-weight: bold;
    transition: 0.5s;
  }
  &:active {
    border-color: var(--color-seance-600);
    transition: 0.5s;
  }
}
</style>
