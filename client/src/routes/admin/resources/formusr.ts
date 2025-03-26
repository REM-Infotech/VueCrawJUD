import { reactive, ref } from "vue";
export const form = reactive({
  id: 0,
  email: "",
  name: "",
  login: "",
  password: "",

  reset: () => {
    form.id = 0;
    form.email = "";
    form.name = "";
    form.login = "";
    form.password = "";
  },
});
export const current_action = ref("");
