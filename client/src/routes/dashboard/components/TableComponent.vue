<template>
  <div class="card mb-4">
    <div class="card-header">
      <i class="fas fa-table me-1"></i>
      Execuções
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <BTable striped hover id="DataTables" :items="items" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getExecutions } from "./requests";
import { BTable } from "bootstrap-vue-next";
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
