import type { TDataTables } from "CustomDTType";
import type { ColsNumbers, Size } from "bootstrap-vue-next";

import type { TFormBot, TUploadableFile } from "FormBot";
import { reactive, ref } from "vue";

export default function () {
  const show_form_ref = ref(false);
  const formLoaded = ref(false);
  const FormBot = reactive<TFormBot>({
    system: "",
    state_client: {
      selected: null,
      items: [{ value: null, text: "Carregando" }],
    },
    credentials: {
      selected: null,
      items: [{ value: null, text: "Carregando" }],
    },
    type: "",
    files: [],
    need_files: true,
    need_options: true,
    bot_protocolo: false,
    state_client_type: "",
  });
  const dynamic_size = ref<Size | "xl">("xl");
  const column_size = ref<ColsNumbers>(6);
  const messages_error = ref<string[]>([]);
  const TitleForm = ref("Carregando");
  const need_files = ref(true);
  const need_options = ref(true);
  const bot_protocolo = ref(false);
  const state_client_type = ref("");
  const files = ref<TUploadableFile[]>([]);
  const checked_state = ref(false);
  const table_file = ref<TDataTables>();
  return {
    show_form_ref,
    formLoaded,
    FormBot,
    table_file,
    checked_state,
    TitleForm,
    need_files,
    need_options,
    bot_protocolo,
    state_client_type,
    files,
    messages_error,
    dynamic_size,
    column_size,
  };
}
