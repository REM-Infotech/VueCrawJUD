import type { TResponseData } from "ResponsesAPI";
import { defineStore } from "pinia";
export const tokenStore = defineStore("bearerStore", {
  state: () => {
    return { data: {} as TResponseData };
  },
  actions: {
    save(data: TResponseData) {
      this.data = data;
    },
    isLogged() {
      return Object.keys(this.data).length > 0;
    },
    logout() {
      this.data = {} as TResponseData;
    },
  },
  persist: true,
});
