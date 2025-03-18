<script setup lang="ts">
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onBeforeMount, onMounted, ref } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { useRouter } from "vue-router";
DataTable.use(DataTablesCore);

let items = [];
import { api } from "../main";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";

const data_ = ref(false);
const router = useRouter();
onMounted(async function () {
  api
    .get("/executions", {
      withCredentials: true,
    })
    .then(async (response) => {
      items = response.data.data.map((item) => {
        return [
          item.pid,
          item.user,
          item.botname,
          item.xlsx,
          () => {
            return moment(item.start_date, "ddd, DD MMM YYYY HH:mm:ss GMT").format(
              "DD/MM/YYYY HH:mm",
            );
          },
          item.status,

          () => {
            return moment(item.stop_date, "ddd, DD MMM YYYY HH:mm:ss GMT").format(
              "DD/MM/YYYY HH:mm",
            );
          },
          item.file_output,
        ];
      });
      data_.value = true;
    })
    .catch((error) => {
      if (error.code) {
        if (error.status === 401) {
          sessionStorage.setItem("message", "Sessão expirada, faça login novamente!");
          router.push({ name: "login" });
        }
        console.log(error);
      }
    });
});
</script>

<template>
  <div data-bs-theme="dark" class="card mb-4">
    <div class="card-header">
      <i class="fas fa-table me-1"></i>
      Execuções
    </div>
    <div class="card-body">
      <div v-if="data_" class="table-responsive">
        <DataTable :data="items" class="placeholder-glow table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Usuário</th>
              <th>Nome do Robô</th>
              <th>Arquivo de Execução</th>
              <th>Data da Execução</th>
              <th>Status</th>
              <th>Data finalização</th>
              <th data-sortable="false">Arquivo de saida</th>
            </tr>
          </thead>
          <template #column-7="props">
            <a
              v-if="props.rowData[5].toString().toLowerCase() !== 'em execução'"
              href="#"
              class="btn btn-sm btn-success"
              data-bs-toggle="tooltip"
              data-bs-title="Default tooltip"
              ><FontAwesomeIcon :icon="faDownload"
            /></a>
            <a
              v-else-if="props.rowData[7].toString().toLowerCase() !== 'em execução'"
              href="#"
              class="btn btn-sm btn-primary"
              data-bs-toggle="tooltip"
              data-bs-title="Default tooltip"
              ><FontAwesomeIcon :icon="faEye"
            /></a>
          </template>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Usuário</th>
              <th>Nome do Robô</th>
              <th>Arquivo de Execução</th>
              <th>Data da Execução</th>
              <th>Status</th>
              <th>Data finalização</th>
              <th data-sortable="false">Arquivo de saida</th>
            </tr>
          </tfoot>
        </DataTable>
      </div>
      <div v-if="!data_" class="table-responsive">
        <table class="placeholder-glow table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Usuário</th>
              <th>Nome do Robô</th>
              <th>Arquivo de Execução</th>
              <th>Data da Execução</th>
              <th>Status</th>
              <th>Data finalização</th>
              <th data-sortable="false">Arquivo de saida</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
            <tr class="text-center">
              <td colspan="8"><span class="placeholder w-100 rounded">Carregando</span></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Usuário</th>
              <th>Nome do Robô</th>
              <th>Arquivo de Execução</th>
              <th>Data da Execução</th>
              <th>Status</th>
              <th>Data finalização</th>
              <th data-sortable="false">Arquivo de saida</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
