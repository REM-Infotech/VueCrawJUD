<script setup lang="ts">
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileDownload, faTrash, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import useFileList from "./file_list";
import DropZone from "./FileDropZone.vue";
import { onMounted } from "vue";
import "datatables.net-select";
import { ref } from "vue";

const ex1Options = [
  { value: null, text: "Selecione uma Credencial" },
  { value: "a", text: "This is First option" },
  { value: "b", text: "Selected Option" },
  { value: { C: "3PO" }, text: "This is an option with object value" },
  { value: "d", text: "This one is disabled", disabled: true },
];

const ex2Options = [
  { value: null, text: "Please select an optio 2n" },
  { value: "a", text: "This is First option" },
  { value: "b", text: "Selected Option" },
  { value: { C: "3PO" }, text: "This is an option with object value" },
  { value: "d", text: "This one is disabled", disabled: true },
];

const selected = ref(null);
DataTable.use(DataTablesCore);

let dt;

onMounted(() => {
  dt = table_file.value.dt;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { files, addFiles, removeFile, FilesListable, table_file, columns } = useFileList();

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
</script>

<template>
  <BModal id="ModalFormBot" data-bs-theme="dark" size="xl" centered>
    <div>
      <BForm>
        <div class="row g-3 p-2 m-1">
          <div class="col-lg-12 mb-3">
            <div class="card p-3">
              <div class="card-body row">
                <DropZone
                  class="col-md-4 p-3 mb-3 bg-secondary bg-opacity-25 text-white border border-5 rounded rounded-4 drop-area d-flex justify-content-center align-items-center"
                  @files-dropped="addFiles"
                  #default="{ dropZoneActive }"
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
                <div class="col-md-8 p-3 mb-3">
                  <BFormSelect class="mb-3" v-model="selected" :options="ex1Options" />
                  <BFormSelect class="mb-3" v-model="selected" :options="ex2Options" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12 mb-3">
            <div class="card">
              <div class="card-header">
                <h4>Arquivos</h4>
              </div>
              <div class="card-body">
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
                <!-- <div class="row">
                  <div class="col-sm-3">
                    <BButton @click="selectAll" class="btn-icon-split" variant="primary">
                      <span class="icon text-white-50">
                        <FontAwesomeIcon :icon="faCheckSquare" class="" />
                      </span>
                      <span class="text">Selecionar Todos</span>
                    </BButton>
                  </div>
                  <div class="col-sm-3">
                    <BButton @click="remove" class="btn-icon-split" variant="danger">
                      <span class="icon text-white-50">
                        <FontAwesomeIcon :icon="faTrash" class="" />
                      </span>
                      <span class="text">Remover Selecionados</span>
                    </BButton>
                  </div>
                  <div class="col-sm-2"></div>
                </div> -->
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
            <FontAwesomeIcon :icon="faTrash" class="" />
          </span>
          <span class="text">Iniciar Execução</span>
        </BButton>
      </div>
    </template>
  </BModal>
  <!-- <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div> -->
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
