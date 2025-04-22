// stores/counter.js
import type { LoginResponse } from 'LoginResponse';
import { defineStore } from 'pinia';
export const tokenStore = defineStore('bearerStore', {
  state: () => {
    return { token: "", "x-csrf-token": "" }
  },
  actions: {
    save(resp: LoginResponse) {
      this.token = resp.data.token;
      this['x-csrf-token'] = resp.data['x-csrf-token'];
    },
    isLogged() {
      return this.token !== "" && this['x-csrf-token'] !== "";
    }
  },
})



