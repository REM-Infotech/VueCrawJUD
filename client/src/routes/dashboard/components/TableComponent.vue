<template>
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-table me-1"></i>
      Execuções
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-striped table-hover" id="FormatedDataTable">
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getExecutions } from "./requests";
import DataTable from "datatables.net-bs5";
import { onMounted, ref } from "vue";
import jQuery from "jquery";
const $ = jQuery;
var datatablesSimple = $("#DataTables");
datatablesSimple.on("update", function () {
  new DataTable(datatablesSimple, {
    searching: false,
    deferRender: true,
    deferLoading: 57,
    processing: true,
    serverSide: true,
  });
});
const items = ref([]);
onMounted(async () => {
  items.value = await getExecutions();
});
</script>
