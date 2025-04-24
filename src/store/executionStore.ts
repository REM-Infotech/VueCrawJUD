// stores/counter.js
import { api } from "@shared/axios";
import { convertDate } from "@shared/convert_date";
import { defineStore } from "pinia";
import { ref } from "vue";
import { tokenStore } from "./tokenAuthStore";

export const items = ref([]);
export const data_ = ref(false);

export const execStore = defineStore("ExecutionsStore", {
  state: () => {
    return { items: [] };
  },
  actions: {
    async load() {
      let response = null;
      let values = [];

      try {
        response = await api.get("/executions", {
          headers: {
            "X-CSRF-TOKEN": tokenStore()["x-csrf-token"],
            Authorization: `Bearer ${tokenStore().token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        values = response.data.data.map((item: Record<string, string>) => {
          return [
            item.pid,
            item.user,
            item.botname,
            item.xlsx,
            () => {
              return convertDate(item.start_date);
            },
            item.status,

            () => {
              return convertDate(item.stop_date);
            },
            item.file_output,
          ];
        });

        this.items = values;
        data_.value = true;
      } catch {
        //
      }
    },
    clear() {
      this.items = [];
      data_.value = false;
    },
  },
});
