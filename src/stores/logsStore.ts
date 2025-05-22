import type { TDataLog, TLog } from "LogTypes";
import { defineStore } from "pinia";

export const LogsStore = defineStore("LogsStore", {
  state: () => {
    return {
      logs: [] as TLog[],
      pid: "" as string,
      total: 0,
      remaining: 0,
      success: 0,
      errors: 0,
      executed: 0,
    };
  },
  actions: {
    update(data: TLog) {
      this.logs.push(data);
    },
    clear() {
      this.logs = [];
      this.pid = "";
    },
    updateCount(data: TDataLog) {
      const success = data.success;
      const errors = data.errors;
      this.total = data.total;
      this.remaining = data.remaining;
      this.success = success;
      this.errors = errors;
      this.executed = success + errors;
    },
  },
});
