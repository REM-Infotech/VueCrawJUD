<template>
  <main
    class="form-signin w-100 m-auto position-absolute top-50 start-50 translate-middle"
    data-bs-theme="light"
  >
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
import jQuery from "jquery";
const $ = jQuery;
import { authenticate } from "./auth";
import { useRouter } from "vue-router";

const router = useRouter();

const handleSubmit = (e: Event) => {
  e.preventDefault();
  authenticate(router);
};

$(function () {
  $("#csrf_token").val("1234567890");

  if (router.currentRoute.value.name === "login") {
    console.log("You are on the login page");
    if (!$("#app").hasClass("bg-indigo")) {
      $("#app").addClass("bg-indigo");
    }
  }
});
</script>
