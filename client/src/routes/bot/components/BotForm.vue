<script setup lang="ts">
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileDownload, faTrash, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "bootstrap-vue-next";
import FormConfig from "./FormConfig.ts";
import DropZone from "./FileDropZone.vue";
import { onMounted } from "vue";

import { ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $, api } from "../../../main.ts";

const { show } = useModal("modal-load");

const selected = ref(null);
const need_files = ref(true);
const need_options = ref(true);
const bot_protocolo = ref(false);
const selected2 = ref(null);
DataTable.use(DataTablesCore);

const credentials = ref<unknown[]>([{ value: null, text: "Carregando", disabled: true }]);

const state_client = ref<unknown[]>([{ value: null, text: "Carregando", disabled: true }]);

const TitleForm = ref();
let dt;

onMounted(() => {
  dt = table_file.value.dt;
});

const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  files,
  addFiles,
  removeFile,
  FilesListable,
  table_file,
  columns,
} = FormConfig();

function remove() {
  dt.rows({ selected: true }).every(function () {
    let idx = FilesListable.value.indexOf(this.data());
    removeFile(this.data().file[0]);
    FilesListable.value.splice(idx, 1);
  });
}
// Função para selecionar todos os arquivos da tabela
function selectAll() {
  dt.rows().select();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setup_form = async (_e) => {
  const item = JSON.parse(sessionStorage.getItem("current_bot") as string);
  TitleForm.value = item.display_name;
  if (item.form_cfg === "only_auth") {
    need_files.value = false;
  } else if (item.form_cfg === "only_file") {
    need_options.value = false;
  }

  if (item.type == "PROTOCOLO") {
    bot_protocolo.value = true;
  }

  const response_creds = await api.post(
    `/acquire_credentials`,
    {
      system: item.system,
      state: item.state,
      client: item.client,
      form_cfg: item.form_cfg,
    },
    {
      withXSRFToken: true,
      withCredentials: true,
      xsrfCookieName: "csrf_access_token",
    },
  );
  const response_state_client = await api.post(
    "/acquire_systemclient",
    {
      system: item.system,
      state: item.state,
      client: item.client,
      type: item.type,
      form_cfg: item.form_cfg,
    },
    {
      withXSRFToken: true,
      withCredentials: true,
      xsrfCookieName: "csrf_access_token",
    },
  );
  credentials.value = response_creds.data;
  state_client.value = response_state_client.data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reset_form = async (_e) => {
  credentials.value = [{ value: null, text: "Carregando" }];
  state_client.value = [{ value: null, text: "Carregando" }];
  need_files.value = true;
  need_options.value = true;
  bot_protocolo.value = false;
};

const validate_form = () => {
  console.log("ok");
};

async function peformSubmit(event: Event) {
  event.preventDefault();
  show();
  validate_form();
  const item = JSON.parse(sessionStorage.getItem("current_bot") as string);

  const formData = new FormData();
  formData.append("credential", selected.value || "");
  formData.append("state", selected2.value || "");
  FilesListable.value.forEach((fileItem) => {
    formData.append("files", fileItem.file[0].file);
  });

  const system: string = item.system.toLowerCase();
  const type: string = item.type.toLowerCase();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await api.post(`/bot/${item.id}/${system}/${type}`, formData, {
    withXSRFToken: true,
    withCredentials: true,
    xsrfCookieName: "csrf_access_token",
  });
}
</script>

<template>
  <BModal
    id="ModalFormBot"
    data-bs-theme="dark"
    size="xl"
    centered
    @show="setup_form"
    :title="TitleForm"
    class="text-white"
    @hide="reset_form"
  >
    <div>
      <BForm id="FormBot" @submit="peformSubmit">
        <div class="row g-3 p-2 m-1">
          <div class="col-12 card" v-if="need_options">
            <div class="p-3">
              <div class="card-body">
                <BFormSelect class="mb-3" v-model="selected" :options="credentials" />
                <BFormSelect class="mb-3" v-model="selected2" :options="state_client" />
                <div class="mb-3">
                  <div class="form-floating" v-if="bot_protocolo">
                    <input
                      type="password"
                      class="form-control"
                      id="floatSenhaToken"
                      placeholder="Password"
                    />
                    <label for="floatSenhaToken">Senha Token</label>
                  </div>
                </div>
                <div class="col-12 p-3"></div>
              </div>
            </div>
          </div>
          <hr />
          <div v-if="need_files" class="col-lg-12 mb-3">
            <div class="card">
              <div class="card-header">
                <h4>Arquivos</h4>
              </div>
              <div class="card-body">
                <div id="drop_zone">
                  <DropZone
                    class="rounded rounded-4 p-3 mb-3 bg-secondary bg-opacity-25 text-white drop-area d-flex justify-content-center align-items-center"
                    @files-dropped="addFiles"
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
                </div>
                <div class="table-responsive">
                  <DataTable
                    id="FilesTable"
                    :data="FilesListable"
                    :columns="columns"
                    ref="table_file"
                    :options="{ select: true }"
                    class="display table"
                  >
                    <template #column-1="props">
                      <span>{{ props.cellData[1] }}</span>
                    </template>
                  </DataTable>
                </div>
              </div>
              <div class="card-footer">
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
            </div>
          </div>
          <div class="col-12 mb-3 p-3 border border-2 rounded rounded-4">
            <BFormCheckbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            >
              Confirmo que os dados inseridos estão corretos
            </BFormCheckbox>
          </div>
          <BButton class="col-12" id="InitBot" type="submit" variant="outline-success">
            <span class="fw-bold">Iniciar Execução</span>
          </BButton>
        </div>
      </BForm>
    </div>
    <template #footer>
      <div class="d-grid gap-0"></div>
    </template>
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
</style>
