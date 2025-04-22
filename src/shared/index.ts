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
