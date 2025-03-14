<template>
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-table me-1"></i>
      Execuções
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table
          class="placeholder-glow table table-striped table-hover"
          :items="items"
          id="DataTables"
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
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { getExecutions } from "./requests";
import DataTable from "datatables.net-bs5";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
interface Execution {
  pid: string;
  user: string;
  botname: string;
  xlsx: string;
  start_date: string;
  status: string;
  stop_date: string;
  file_output: string;
}

const router = useRouter();

const items = ref<Execution[]>([]);
onMounted(async () => {
  getExecutions().then((data) => {
    console.log(data);

    if (data.code) {
      if (data.code === "ERR_BAD_REQUEST") {
        sessionStorage.setItem("message", "Sessão expirada, faça login novamente!");
        router.push({ name: "login" });
      }
    }

    new DataTable("#DataTables", {
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      lengthChange: true,
      lengthMenu: [5, 10],
      pageLength: 5,
      data: data,
      columnDefs: [
        {
          targets: [4, 6],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render: function (data: string, _type, _row) {
            console.log(data);

            return moment(data, "ddd, DD MMM YYYY HH:mm:ss GMT").format("DD/MM/YYYY HH:mm");
          },
        },
      ],
    });
  });
});
</script>
