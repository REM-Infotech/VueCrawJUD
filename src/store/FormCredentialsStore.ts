import type { TSelectInput } from "FormBot";
import { defineStore } from "pinia";
export const tokenStore = defineStore("CredsStore", {
  state: () => {
    return { credentials: [] as TSelectInput[] };
  },
  actions: {
    loadCredentials(credentials: TSelectInput[]) {
      this.credentials = credentials;
    },
  },
});
