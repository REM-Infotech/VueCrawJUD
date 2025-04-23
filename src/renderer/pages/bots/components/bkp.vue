<script setup lang="ts">
import { faCheckSquare, faFileDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { current_bot } from "@shared/FormConfig";
import { type Api as Dt } from "datatables.net";
import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";
import { onMounted } from "vue";
import DropZone from "./FileDropZone.vue";

import type { TSelectInput } from "@/@types/FormBot";
import { loadCredentials, loadStateClient } from "@/shared/LoadDataBot";
import { api } from "@shared/axios";
import { $ } from "@shared/index";
import { watch } from "vue";
import FormSetup from "./FormConfig";

const {
  bot_protocolo,
  FormBot,
  hide_load,
  router,
  selected,
  selected2,
  show_form,
  show_load,
  show_message,
  TitleForm,
} = FormSetup();

let dt: Dt;

watch(FormBot.files, () => {
  FormBot.files = files.value;
});

const { files, addFiles, removeFile, FilesListable, table_file, columns } = FormConfig();

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

const validate_form = () => {
  if (FormBot.need_files === true) {
    if (FilesListable.value.length === 0) {
      $("#message").text("Selecione ao menos um arquivo.");
      show_message();
      return false;
    }
  }

  if (FormBot.need_options === true) {
    if (selected.value === null || selected2.value === null) {
      $("#message").text("Selecione as opções necessárias.");
      show_message();
      return false;
    }
  }

  if ($("#checkbox-1").prop("checked") === false) {
    $("#message").text("Confirme que os dados inseridos estão corretos.");
    show_message();
    return false;
  }

  return true;
};

const setup_form = async () => {
  const item = current_bot.value;

  if (item.form_cfg === "only_auth") {
    FormBot.need_files = false;
  } else if (item.form_cfg === "only_file") {
    FormBot.need_options = false;
  }

  if (item.type == "PROTOCOLO") {
    bot_protocolo.value = true;
  }

  let credentials: TSelectInput[];
  try {
    credentials = await loadCredentials(item);
    const { state_client, isStateOrClient } = await loadStateClient(item);

    TitleForm.value = item.display_name;

    FormBot.credentials.items = credentials;
    FormBot.state_client.items = state_client;

    FormBot.state_client_type = isStateOrClient;

    show_form();
  } catch (error) {
    console.log(error);
    return;
  }
};

DataTable.use(DataTablesCore);

async function peformSubmit(event: Event) {
  event.preventDefault();
  const item = current_bot.value;

  show_load();
  if (validate_form() === false) {
    setTimeout(() => {
      hide_load();
    }, 500);
    return;
  }

  const formData = new FormData();
  formData.append("creds", FormBot.credentials.selected || "");
  formData.append(FormBot.state_client_type, selected2.value || "");
  FormBot.files.forEach((fileItem) => {
    formData.append(fileItem?.name, fileItem?.file);
  });
  const system: string = item.system.toLowerCase();
  const type: string = item.type.toLowerCase();

  api
    .post(`/bot/${item.id}/${system}/${type}`, formData, {
      withXSRFToken: true,
      withCredentials: true,
      headers: {
        // Note: Changing the Content-Type may avoid the preflight but could affect your API expectations.
        "Content-Type": "application/x-www-form-urlencoded", // Use a "simple" header if possible
        "x-csrf-token": sessionStorage.getItem("x-csrf-token") || "",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const pid = response.data.pid;
        router.push({ name: "logs_bot", params: { pid: pid } });

        $("#message").text(`Execução iniciada! PID: ${pid}`);
      }
    });
}
</script>

<template>
  <BModal
    no-footer
    id="ModalFormBot"
    data-bs-theme="dark"
    size="xl"
    centered
    @show="setup_form"
    :title="TitleForm"
    class="text-white"
  >
    <div>
      <BForm id="FormBot" @submit="peformSubmit">
        <div class="row g-3 p-2 m-1">
          <div class="col-12" v-if="FormBot.need_options">
            <BFormSelect
              class="mb-3"
              v-model="FormBot.credentials.selected"
              :options="FormBot.credentials.items"
            />
            <BFormSelect
              class="mb-3"
              v-model="FormBot.state_client.selected"
              :options="FormBot.state_client.items"
            />
            <div class="mb-3">
              <div class="form-floating" v-if="bot_protocolo">
                <input type="password" class="form-control" id="token" placeholder="Password" />
                <label for="token">Senha Token</label>
              </div>
            </div>
          </div>
          <div v-if="FormBot.need_files" class="col-lg-12 mb-3">
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
