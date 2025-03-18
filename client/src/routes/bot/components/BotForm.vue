<script setup lang="ts">
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileDownload, faTrash, faCheckSquare, faPlay } from "@fortawesome/free-solid-svg-icons";
import FormConfig from "./FormConfig.ts";
import DropZone from "./FileDropZone.vue";
import { onMounted } from "vue";

import { ref } from "vue";
import { api } from "../../../main.ts";

const selected = ref(null);
const selected2 = ref(null);
DataTable.use(DataTablesCore);

const credentials = ref([{ value: null, text: "Selecione uma Credencial" }]);

const state_client = ref([{ value: null, text: "" }]);

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

  response_creds.data.map((cred) => {
    credentials.value.push(cred);
  });

  response_state_client.data.map((cred) => {
    state_client.value.push(cred);
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reset_form = async (_e) => {
  credentials.value = [{ value: null, text: "Selecione uma opção" }];
  state_client.value = [{ value: null, text: "Selecione uma opção" }];
};
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
      <BForm>
        <div class="row g-3 p-2 m-1">
          <div class="col-12">
            <div class="card p-3">
              <div class="card-body row">
                <div class="col-12 p-3 mb-3">
                  <BFormSelect class="mb-3" v-model="selected" :options="credentials" />
                  <BFormSelect class="mb-3" v-model="selected2" :options="state_client" />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="col-lg-12 mb-3">
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
        </div>
      </BForm>
    </div>
    <template #footer>
      <div class="d-grid gap-0">
        <BButton class="btn-icon-split" variant="success">
          <span class="icon text-white-50">
            <FontAwesomeIcon :icon="faPlay" class="" />
          </span>
          <span class="text">Iniciar Execução</span>
        </BButton>
      </div>
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
