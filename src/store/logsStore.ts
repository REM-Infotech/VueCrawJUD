import { defineStore } from "pinia";

export const LogsStore = defineStore("LogsStore", {
  state: () => {
    return { logs: [] as string[], pid: "" as string };
  },
  actions: {
    update(message: string) {
      this.logs.push(message);
    },
    clear() {
      this.logs = [];
      this.pid = "";
    },
  },
});
