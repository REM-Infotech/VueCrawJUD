<template>
  <main class="d-flex justify-content-center mt-4 align-items-center main_login" id="mainFrame">
    <BContainer class="p-5 d-flex mt-4 justify-content-center">
      <BForm class="form-signin" @submit="handleSubmit">
        <IconLogo />
        <BFormGroup
          label="Login"
          label-for="input-1"
          class="mb-2"
          :invalid-feedback="invalidFeedbackLogin"
          :state="stateLogin"
          floating
        >
          <BFormInput
            id="input-1"
            v-model="Form.login"
            :state="stateLogin"
            placeholder="Login"
            trim
          />
        </BFormGroup>
        <BFormGroup
          id="fieldset-2"
          label="Password"
          label-for="input-2"
          class="mb-3"
          :invalid-feedback="invalidFeedbackPassword"
          :state="statePassword"
          label-class="mb-2"
          floating
        >
          <BFormInput
            id="input-2"
            v-model="Form.password"
            :state="statePassword"
            placeholder="Password"
            trim
            type="password"
          />
        </BFormGroup>
        <div class="d-grid gap-0 mt-4">
          <BButton class="btn-purple" type="submit">Login</BButton>
        </div>
      </BForm>
    </BContainer>
  </main>
</template>
<script setup lang="ts">
import { BButton, BContainer, BForm, BFormGroup, BFormInput } from "bootstrap-vue-next";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import IconLogo from "./IconLogo.vue";

const router = useRouter();

const isSubmited = ref(false);
const Form = reactive({
  login: "",
  password: "",
});

function ValidatorState(formInput: string) {
  return !(formInput.length === 0) ? null : !isSubmited.value ? null : !(formInput.length === 0);
}

function TextInvalidFeedback(formInput: string) {
  return formInput.length === 0
    ? "Esse campo não pode ficar em branco"
    : "Esse campo não pode ficar em branco";
}

const stateLogin = computed(() => ValidatorState(Form.login));
const statePassword = computed(() => ValidatorState(Form.password));
const invalidFeedbackLogin = computed(() => TextInvalidFeedback(Form.login));
const invalidFeedbackPassword = computed(() => TextInvalidFeedback(Form.login));

async function handleSubmit(event: Event) {
  console.log(event);
  event.preventDefault();

  if (Form.login.length === 0 || Form.password.length === 0) {
    isSubmited.value = true;
    return;
  }

  router.push({ name: "dashboard" });
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/colors";
.form-signin {
  width: 55%;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin #input-1 {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin #input-2 {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.btn-purple {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
  border-radius: 5px;
}

[data-bs-theme="dark"] {
  .btn-purple {
    background-color: $purple-heart-800;
    border-color: $purple-heart-800;
  }

  .btn-purple:hover {
    background-color: $purple-heart-900;
    border-color: $purple-heart-900;
  }
  .btn-purple:active {
    background-color: $purple-heart-700;
    border-color: $purple-heart-700;
  }
}
[data-bs-theme="light"] {
  .btn-purple {
    background-color: $purple-heart-600;
    border-color: $purple-heart-600;
    border-radius: 5px;
  }

  .btn-purple:hover {
    background-color: $purple-heart-700;
    border-color: $purple-heart-700;
    transition:
      background-color 0.4s ease,
      color 0.4s ease;
  }
  .btn-purple:active {
    background-color: $purple-heart-500;
    border-color: $purple-heart-500;
  }
}
</style>
