<script setup lang="ts">
import { data_, execStore, items } from "@/renderer/store/executionStore";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { tokenStore } from "@store/tokenAuthStore";
import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";
import { onMounted } from "vue";
DataTable.use(DataTablesCore);
const authStore = tokenStore();
const options = {
  language: {
    url: "./src/renderer/assets/locales/pt-br.json",
  },
};

onMounted(async function () {
  const exec_Store = execStore().$state;

  console.log(exec_Store);

  data_.value = exec_Store.items.length === 0;
  if (data_.value) {
    await execStore().load();
  }

  items.value = execStore().$state.items;
});

const download_file = (file: string) => {
  window.electronAPI.file_save(file, authStore["x-csrf-token"], authStore.token);
};
// const download_file = async (file: string) => {
//   show_load();

//   setTimeout(async () => {
//     api.get(`/executions/download/${file}`).then((response: AxiosResponse) => {
//       const data = response.data;
//       const url: string = data.url;
//       window.open(url, "_blank");

//       setTimeout(() => {
//         hide_load();
//       }, 500);

//       $("#message").text(`Download do arquivo "${file}" iniciado!`);
//       show_message();
//     });
//   }, 1000);
// };
</script>

<template>
  <div data-bs-theme="dark" class="card mb-4">
    <div class="card-header">
      <i class="fas fa-table me-1"></i>
      Execuções
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <DataTable
          :data="items"
          class="placeholder-glow table table-striped table-hover"
          :options="options"
          v-model="data_"
        >
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
            <button
              v-if="props.rowData[5].toString().toLowerCase() !== 'em execução'"
              class="btn btn-sm btn-success"
              data-bs-toggle="tooltip"
              data-bs-title="Default tooltip"
              @click="download_file(props.cellData)"
            >
              <FontAwesomeIcon :icon="faDownload" />
            </button>

            <a
              v-else-if="props.rowData[5].toString().toLowerCase() === 'em execução'"
              :href="`/logs_bot/${props.rowData[0]}`"
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
    </div>
  </div>
</template>
