import { storeMap } from "@store/index";
import jQuery from "jquery";
import { ref } from "vue";

export const $ = jQuery;
export const selected2 = ref(null);
export const systems_list = ref<unknown[]>([{ value: null, text: "Carregando", disabled: true }]);

export const delete_call = ref(false);
export const current_action = ref("");
export const state_modal = ref(false);

export const submited = ref(false);
export const to_modal_message = ref(false);

export async function clearStores() {
  const stores = Object.entries(storeMap).map(([store_name, stores_data]) => {
    const storefn = stores_data();
    return { store_name, storefn };
  });

  try {
    stores.forEach(({ storefn }) => {
      storefn.clear();
    });
  } catch {
    //
  }
  const creds = await window.electronAPI.getAllCredentials();

  if (creds.length > 0) {
    const { account } = creds[0];
    await window.electronAPI.RemoveCredentials(account);
  }
}
