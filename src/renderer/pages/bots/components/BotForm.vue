<script setup lang="ts">
import FormFileCfg from "@/renderer/services/Bot/FormFileCfg";
import FormRefs from "@/renderer/services/Bot/FormRefs";
import FormSelectCfg from "@/renderer/services/Bot/FormSelectCfg";
import { $ } from "@/shared";
import { faCheckSquare, faFileDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { api } from "@shared/axios";
import { botStore } from "@store/botsStore";
import { tokenStore } from "@store/tokenAuthStore";
import { BvTriggerableEvent, useModal } from "bootstrap-vue-next";
import type { TDataTables } from "CustomDTType";
import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";
import type { TCurrentBot, TSelectInput } from "FormBot";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import DropZone from "./FileDropZone.vue";

const currentBot = ref<TCurrentBot>({} as TCurrentBot);
const { show: show_load, hide: hide_load } = useModal("modal-load");

const { show: show_message } = useModal("ModalMessage");
const { show: show_form } = useModal("ModalFormBot");

const router = useRouter();
const { loadCredentials, loadStateClient } = FormSelectCfg();
const { addFiles } = FormFileCfg();
const {
  files,
  checked_state,
  column_size,
  dynamic_size,
  table_file,
  TitleForm,
  FormBot,
  formLoaded,
  show_form_ref,
} = FormRefs();

let item: TCurrentBot;
const addfiles_ = (filesAppend: File[]) => {
  const filesPush = addFiles(filesAppend, files);

  FormBot.files.push(...filesPush);
  files.value.push(...filesPush);
};

const columns = [
  {
    data: "index",
    title: "#",
  },
  {
    data: "file",
    title: "Nome do arquivo",
  },
];

function remove() {
  (table_file.value?.dt as TDataTables).rows({ selected: true }).every(function () {
    let idx = FormBot.files.indexOf(this.data());
    removeFile(this.data().file);
    FormBot.files.splice(idx, 1);
  });
}
// Função para selecionar todos os arquivos da tabela
const selectAll = () => {
  (table_file.value?.dt as TDataTables).rows().select();
};

function removeFile(file: File) {
  const index = FormBot.files.findIndex((f) => f.name === file.name);
  if (index !== -1) {
    FormBot.files.splice(index, 1);
    files.value.splice(index, 1);
  }
}

const credentials_computed = computed(() => {
  return FormBot.credentials.selected !== null;
});
const state_client_computed = computed(() => {
  return FormBot.state_client.selected !== null;
});

const checked_state_computed = computed(() => {
  return checked_state.value;
});

const FilesListable = () => {
  return FormBot.files.map((file, index) => {
    return {
      index: index,
      file: file,
    };
  });
};

watch(FormBot.files, () => {
  const file_lenght = files.value.length > 0;
  if (file_lenght) {
    DataTable.use(DataTablesCore);
    column_size.value = 6;
    dynamic_size.value = "xl";
  } else if (!file_lenght) {
    setTimeout(() => {
      column_size.value = 12;
      dynamic_size.value = "lg";
      table_file.value = undefined;
    }, 500);
  }
});

const load_options = async (e: BvTriggerableEvent) => {
  show_load();
  if (!formLoaded.value) {
    e.preventDefault();
  } else if (formLoaded.value) {
    hide_load();
    return;
  }

  currentBot.value = botStore().currentBot;
  item = currentBot.value;

  if (item.form_cfg === "only_auth") {
    FormBot.need_files = false;
  } else if (item.form_cfg === "only_file") {
    FormBot.need_options = false;
  }

  if (item.type == "PROTOCOLO") {
    FormBot.bot_protocolo = true;
  }

  let credentials: TSelectInput[];
  try {
    credentials = await loadCredentials(item);
    const { state_client, isStateOrClient } = await loadStateClient(item);

    TitleForm.value = item.display_name as string;

    FormBot.credentials.items = credentials;
    FormBot.state_client.items = state_client;

    FormBot.state_client_type = isStateOrClient;
    show_form();
  } catch {
    return;
  }
  formLoaded.value = true;
};

async function peformSubmit(event: BvTriggerableEvent) {
  event.preventDefault();
  show_load();

  if (!checked_state.value) {
    $("#message").text("Você deve aceitar os termos para continuar.");
    show_message();
    return;
  }

  currentBot.value = botStore().currentBot;
  item = currentBot.value;

  const formData = new FormData();
  formData.append("creds", FormBot.credentials.selected || "");
  formData.append(FormBot.state_client_type, FormBot.state_client.selected || "");

  FormBot.files.forEach((fileItem) => {
    // console.log(fileItem);
    formData.append(fileItem.file.name, fileItem.file);
  });

  // console.log(FilesListable.value);

  const system: string = item.system.toLowerCase();
  const type: string = item.type?.toLowerCase() as string;

  api
    .post(`/bot/${item.id}/${system}/${type}`, formData, {
      headers: {
        "X-CSRF-TOKEN": tokenStore()["x-csrf-token"],
        Authorization: `Bearer ${tokenStore().token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const pid = response.data.pid;
        router.push({ name: "logs_bot", params: { pid: pid } });

        $("#message").text(`Execução iniciada! PID: ${pid}`);
      }
    })
    .catch(() => {
      $("#message").text("Erro ao iniciar execução.");
      show_message();
    });
}
</script>

<template>
  <BModal
    @hide="formLoaded = false"
    :show="show_form_ref"
    no-footer
    id="ModalFormBot"
    data-bs-theme="dark"
    :size="dynamic_size"
    centered
    class="text-white"
    @show="load_options"
    :title="currentBot.display_name"
  >
    <BContainer class="mt-4">
      <BForm id="FormBot" @submit="peformSubmit">
        <BRow>
          <BCol :md="column_size">
            <BCard>
              <BRow>
                <BCol md="12">
                  <BFormSelect
                    :state="credentials_computed"
                    v-model="FormBot.credentials.selected"
                    :options="FormBot.credentials.items"
                    class="mb-3"
                  />
                </BCol>
                <BCol md="12">
                  <BFormSelect
                    :state="state_client_computed"
                    v-model="FormBot.state_client.selected"
                    :options="FormBot.state_client.items"
                    class="mb-3"
                  />
                </BCol>
                <BCol md="12">
                  <DropZone
                    v-model="FormBot.files"
                    class="rounded rounded-4 p-3 mb-4 bg-secondary bg-opacity-25 text-white drop-area d-flex justify-content-center align-items-center"
                    @files-dropped="addfiles_"
                    #default="{ dropZoneActive }"
                    style="height: 15rem"
                  >
                    <div v-if="dropZoneActive">
                      <div
                        class="nav-link link-body-emphasis bg-secondary rounded text-center align-middle p-3"
                      >
                        <FontAwesomeIcon :icon="faFileDownload" class="me-2" />
                        <p>Solte os arquivos aqui</p>
                      </div>
                    </div>
                    <div v-else>
                      <div class="nav-link link-body-emphasis text-center align-middle p-3">
                        <FontAwesomeIcon :icon="faFileDownload" class="me-2" />
                        <p class="fs-6">Clique ou solte os arquivos aqui</p>
                      </div>
                    </div>
                  </DropZone>
                </BCol>
              </BRow>
            </BCard>
          </BCol>
          <Transition>
            <BCol v-if="files.length > 0" :md="column_size">
              <BCard>
                <template #header>
                  <span class="fw-bold">Arquivos</span>
                </template>
                <div class="table-responsive">
                  <DataTable
                    id="FilesTable"
                    :data="FilesListable()"
                    :columns="columns"
                    ref="table_file"
                    :options="{ select: true }"
                    class="display table"
                  >
                    <template #column-1="props">
                      <span>{{ props.cellData.name }}</span>
                    </template>
                  </DataTable>
                </div>
                <template #footer>
                  <div class="d-flex gap-5">
                    <BButton @click="selectAll" class="btn-icon-split me-2" variant="primary">
                      <span class="icon text-white-50">
                        <FontAwesomeIcon :icon="faCheckSquare" class="" />
                      </span>
                      <span class="text">Selecionar Todos</span>
                    </BButton>
                    <BButton @click="remove" class="btn-icon-split me-2" variant="danger">
                      <span class="icon text-white-50">
                        <FontAwesomeIcon :icon="faTrash" class="" />
                      </span>
                      <span class="text">Remover Selecionados</span>
                    </BButton>
                  </div>
                </template>
              </BCard>
            </BCol>
          </Transition>
        </BRow>

        <hr class="mt-3 mb-3" />

        <div class="d-grid">
          <BFormCheckbox
            v-model="checked_state"
            :state="checked_state_computed"
            @click="!checked_state"
            id="checkbox-1"
            name="checkbox-1"
            :value="true"
            :unchecked-value="false"
            class="mb-3"
          >
            Confirmo que os dados inseridos estão corretos
          </BFormCheckbox>
          <BButton id="InitBot" type="submit" variant="outline-success">
            <span class="fw-bold">Iniciar Execução</span>
          </BButton>
        </div>
      </BForm>
    </BContainer>
  </BModal>
</template>

<style>
.btn-icon-split {
  padding: 0;
  overflow: hidden;
  display: inline-flex;
  align-items: stretch;
  justify-content: center;
}

.btn-icon-split .icon {
  background: rgba(0, 0, 0, 0.15);
  display: inline-block;
  padding: 0.375rem 0.75rem;
}

.btn-icon-split .text {
  display: inline-block;
  padding: 0.375rem 0.75rem;
}

.btn-icon-split.btn-sm .icon,
.btn-group-sm > .btn-icon-split.btn .icon {
  padding: 0.25rem 0.5rem;
}

.btn-icon-split.btn-sm .text,
.btn-group-sm > .btn-icon-split.btn .text {
  padding: 0.25rem 0.5rem;
}

.btn-icon-split.btn-lg .icon,
.btn-group-lg > .btn-icon-split.btn .icon {
  padding: 0.5rem 1rem;
}

.btn-icon-split.btn-lg .text,
.btn-group-lg > .btn-icon-split.btn .text {
  padding: 0.5rem 1rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
