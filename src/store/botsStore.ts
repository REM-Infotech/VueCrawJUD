// stores/counter.js
import { api } from "@shared/axios";
import type { TCurrentBot } from "FormBot";
import { defineStore } from "pinia";

export const botStore = defineStore("botsStore", {
  state: () => {
    return { bots: [], currentBot: {} as TCurrentBot };
  },
  actions: {
    async load() {
      let response = null;

      try {
        response = await api.get("/bots_list");
        this.bots = response.data;
      } catch {
        //
      }
    },
    loadCurrentBot(bot: TCurrentBot) {
      this.currentBot = bot;
    },
    clear() {
      this.bots = [];
      this.currentBot = {} as TCurrentBot;
    },
  },
});
