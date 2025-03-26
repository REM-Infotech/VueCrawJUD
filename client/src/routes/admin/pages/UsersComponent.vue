<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { api } from "../../../main";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";

const items = ref();
DataTable.use(DataTablesCore);
onBeforeMount(async () => {
  try {
    const response = await api.get("/users");

    console.log(response.data);

    items.value = response.data.database.map((item) => {
      return [item.id, item.login, item.nome_usuario, item.email];
    });
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="card" data-bs-theme="dark">
    <div class="card-header d-grid gap-3">
      <div class="d-flex gap-3 p-2">
        <div class="justify-content-xxl-end align-middle me-auto text-center">
          <h3>Usuários</h3>
        </div>
        <div class="justify-content-xxl-end">
          <BButton class="btn me-2 fw-bold" v-b-modal.ModalFormUsr variant="outline-success"
            ><em>Cadastrar Usuário</em></BButton
          >
          <!-- <button type="button" class="btn btn-outline-warning me-2 fw-bold">
            Encerrar Execução<em>Cadastrar Usuário</em>
          </button> -->
        </div>
      </div>
    </div>
    <div class="card-body table-responsive">
      <DataTable :data="items" class="placeholder-glow table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Login</th>
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Login</th>
            <th>Nome</th>
            <th>E-mail</th>
          </tr>
        </tfoot>
      </DataTable>
    </div>
  </div>
</template>
