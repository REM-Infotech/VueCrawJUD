<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import dataTable from "./dataTable.json";
import type { Employee } from "./types";

import DataTablesCore from "datatables.net-bs5";
import DataTable from "datatables.net-vue3";

DataTable.use(DataTablesCore);

const data = ref<(string | number | undefined)[][]>([]);

onBeforeMount(() => {
  const employees: Employee[] = dataTable;

  employees.forEach((employee) =>
    data.value.push([
      employee.Name as unknown as string,
      employee.Age,
      employee.Office,
      employee.Position,
      employee.Salary,
      employee["Start date"],
    ]),
  );
});
</script>

<template>
  <div class="table-responsive">
    <DataTable :data="data" class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Age</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>
