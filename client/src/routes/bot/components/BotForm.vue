<script setup lang="ts">
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFileDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import useFileList from "./file_list";
import DropZone from "./FileDropZone.vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, ref } from "vue";
import "datatables.net-select";

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
</script>

<template>
  <BModal id="ModalFormBot" data-bs-theme="dark" size="xl" centered title="">
    <div>
      <BForm>
        <div class="row g-3 p-2 m-1">
          <div class="col-lg-12 mb-3">
            <div class="card p-3">
              <div class="card-body row">
                <DropZone
                  class="col-md-4 p-3 mb-3 bg-primary bg-opacity-50 text-white border border-5 rounded rounded-1 drop-area"
                  @files-dropped="addFiles"
                  #default="{ dropZoneActive }"
                >
                  <div v-if="dropZoneActive">
                    <div class="text-center align-middle mt-4 border border-5 rounded rounded-1">
                      <FontAwesomeIcon :icon="faFileDownload" class="me-2" />
                      <p>Drop Them</p>
                    </div>
                  </div>
                  <div v-else>
                    <div class="text-center align-middle mt-4 p-3">
                      <FontAwesomeIcon :icon="faFileDownload" class="me-2" />
                      <p class="fs-6 fw-bold">Clique ou solte os arquivos aqui</p>
                    </div>
                  </div>
                </DropZone>
                <div class="col-md-8 p-3 mb-3">
                  <div class="form-floating mb-3">
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
                  </div>
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
                <BButton @click="remove" class="d-grid gap-2" variant="danger">
                  <FontAwesomeIcon :icon="faTrash" class=""
                /></BButton>
              </div>
            </div>
          </div>
        </div>
      </BForm>
    </div>
  </BModal>
</template>
