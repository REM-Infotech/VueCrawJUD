import type { TSelectInput } from "FormBot";
import { defineStore } from "pinia";
export const credsStore = defineStore("CredsStore", {
  state: () => {
    return { credentials: [] as TSelectInput[] };
  },
  actions: {
    loadCredentials(credentials: TSelectInput[]) {
      this.credentials = credentials;
    },
    clear() {
      this.credentials = [];
    },
  },
});
