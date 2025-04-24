import type { TResponseLogin } from "ResponsesAPI";
import { defineStore } from "pinia";
export const tokenStore = defineStore("bearerStore", {
  state: () => {
    return { token: "", "x-csrf-token": "" };
  },
  actions: {
    save(resp: TResponseLogin) {
      this.token = resp.data.token;
      this["x-csrf-token"] = resp.data["x-csrf-token"];
    },
    isLogged() {
      return this.token !== "" && this["x-csrf-token"] !== "";
    },
    clear() {
      this.token = "";
      this["x-csrf-token"] = "";
    },
  },
});
