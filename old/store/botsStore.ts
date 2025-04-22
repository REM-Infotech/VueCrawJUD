// stores/counter.js
import { api } from '@shared/axios';
import { defineStore } from 'pinia';

export const botStore = defineStore('botsStore', {
  state: () => {
    return { bots: [] }
  },
  actions: {
    async load() {

      let response = null;

      try {
        response = await api.get("/bots_list")
        this.bots = response.data;

      } catch {
        //
      }
    },
  },
})



