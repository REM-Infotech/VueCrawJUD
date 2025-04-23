import type { ColsNumbers, Size } from "bootstrap-vue-next";
import { type Api as Dt } from "datatables.net";
import type { TUploadableFile } from "FormBot";
import { ref } from "vue";

export default function () {
  const dynamic_size = ref<Size | "xl">("md");
  const column_size = ref<ColsNumbers>(12);
  const messages_error = ref<string[]>([]);
  const TitleForm = ref("Carregando");
  const need_files = ref(true);
  const need_options = ref(true);
  const bot_protocolo = ref(false);
  const state_client_type = ref("");
  const files = ref<TUploadableFile[]>([]);
  const checked_state = ref(false);
  const table_file = ref<Dt>();
  return {
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
