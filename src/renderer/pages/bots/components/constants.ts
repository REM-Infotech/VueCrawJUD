import { useModal } from "bootstrap-vue-next";
import type { TFormBot } from "FormBot";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default function () {
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
  const { show: show_load, hide: hide_load } = useModal("modal-load");
  const { show: show_message } = useModal("ModalMessage");
  const { show: show_form } = useModal("ModalForm");
  const TitleForm = ref("Carregando");
  const selected = ref(null);
  const need_files = ref(true);
  const need_options = ref(true);
  const bot_protocolo = ref(false);
  const state_client_type = ref("");
  const selected2 = ref(null);
  const router = useRouter();

  return {
    FormBot,
    show_load,
    hide_load,
    show_message,
    show_form,
    TitleForm,
    selected,
    need_files,
    need_options,
    bot_protocolo,
    state_client_type,
    selected2,
    router,
  };
}
