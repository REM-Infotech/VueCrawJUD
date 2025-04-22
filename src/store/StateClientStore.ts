import type { StoreStateClient } from "FormStateClient";
import { defineStore } from "pinia";
export const tokenStore = defineStore("CredsStore", {
  state: () => {
    return { state_client: [] as StoreStateClient[] };
  },
  actions: {
    loadCredentials(states_clients: StoreStateClient[]) {
      this.state_client = states_clients;
    },
  },
});
