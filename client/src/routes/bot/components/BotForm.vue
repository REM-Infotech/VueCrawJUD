<script setup lang="ts">
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileDownload, faTrash, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "bootstrap-vue-next";
import FormConfig from "../../../services/FormConfig.ts";
import DropZone from "./FileDropZone.vue";
import { onMounted } from "vue";

import { ref } from "vue";

import { $, api } from "../../../main.ts";
import { useRouter } from "vue-router";

let dt;
const { show } = useModal("modal-load");
const { show: show_message } = useModal("ModalMessage");
const TitleForm = ref();
const selected = ref(null);
const need_files = ref(true);
const need_options = ref(true);
const bot_protocolo = ref(false);

const state_client_type = ref("");

const selected2 = ref(null);
const router = useRouter();
const credentials = ref<unknown[]>([{ value: null, text: "Carregando", disabled: true }]);
const state_client = ref<unknown[]>([{ value: null, text: "Carregando", disabled: true }]);

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

onMounted(() => {
  dt = table_file.value.dt;
});

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setup_form = async (_e) => {
  const item = JSON.parse(sessionStorage.getItem("current_bot") as string);
  let response_creds;
  let response_state_client;
  TitleForm.value = item.display_name;
  if (item.form_cfg === "only_auth") {
    need_files.value = false;
  } else if (item.form_cfg === "only_file") {
    need_options.value = false;
  }

  if (item.type == "PROTOCOLO") {
    bot_protocolo.value = true;
  }

  try {
    response_creds = await api.post(
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
        headers: {
          "X-CSRF-TOKEN": sessionStorage.getItem("access_csrf"),
        },
      },
    );
  } catch (response) {
    // Check if response.status is 4** error and not 404
    if (
      response.response.status >= 400 &&
      response.response.status < 500 &&
      response.response.status != 404
    ) {
      $("#message").text("Sessão expirada! Faça login novamente.");
      router.push({ name: "login" });
      show_message();
    }
    return;
  }

  try {
    response_state_client = await api.post(
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
        headers: {
          "X-CSRF-TOKEN": sessionStorage.getItem("access_csrf"),
        },
      },
    );
  } catch (response) {
    // Check if response.status is 4** error and not 404
    if (
      response.response.status >= 400 &&
      response.response.status < 500 &&
      response.response.status != 404
    ) {
      $("#message").text("Sessão expirada! Faça login novamente.");
      router.push({ name: "login" });
      show_message();
    }
    return;
  }

  const cred_info = response_creds.data.info;
  const state_client_info = response_state_client.data.info;

  credentials.value = cred_info;
  state_client.value = state_client_info;

  state_client_type.value = response_state_client.data.type;
};

DataTable.use(DataTablesCore);

async function peformSubmit(event: Event) {
  event.preventDefault();
  show();
  validate_form();
  const item = JSON.parse(sessionStorage.getItem("current_bot") as string);

  const formData = new FormData();
  formData.append("creds", selected.value || "");
  formData.append(state_client_type.value, selected2.value || "");

  FilesListable.value.forEach((fileItem) => {
    // console.log(fileItem);
    formData.append(fileItem.file[0].name, fileItem.file[0].file);
  });

  // console.log(FilesListable.value);

  const system: string = item.system.toLowerCase();
  const type: string = item.type.toLowerCase();

  api
    .post(`/bot/${item.id}/${system}/${type}`, formData, {
      withXSRFToken: true,
      withCredentials: true,
      // xsrfCookieName: "csrf_access_token",
    })
    .then((response) => {
      if (response.status === 200) {
        const pid = response.data.pid;
        router.push({ name: "logs_bot", params: { pid: pid } });

        $("#message").text(`Execução iniciada! PID: ${pid}`);
      }
    })
    .catch((response) => {
      // check if response.status is 4** error
      if (
        response.response.status >= 400 &&
        response.response.status < 500 &&
        response.response.status != 404
      ) {
        $("#message").text("Sessão expirada! Faça login novamente.");
        router.push({ name: "login" });
        show_message();
      }
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
                    <input type="password" class="form-control" id="token" placeholder="Password" />
                    <label for="token">Senha Token</label>
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
