import type { StoreCredentials } from "FormCredentials";
import { defineStore } from "pinia";
export const tokenStore = defineStore("CredsStore", {
  state: () => {
    return { credentials: [] as StoreCredentials[] };
  },
  actions: {
    loadCredentials(credentials: StoreCredentials[]) {
      this.credentials = credentials;
    },
  },
});
