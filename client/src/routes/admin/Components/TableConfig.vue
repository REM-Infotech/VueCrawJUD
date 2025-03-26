<script setup>
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
  <div class="container-fluid bg-white rounded rounded-4 bg-opacity-50">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home-tab-pane"
          type="button"
          role="tab"
          aria-controls="home-tab-pane"
          aria-selected="true"
        >
          Home
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile-tab-pane"
          type="button"
          role="tab"
          aria-controls="profile-tab-pane"
          aria-selected="false"
        >
          Profile
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact-tab-pane"
          type="button"
          role="tab"
          aria-controls="contact-tab-pane"
          aria-selected="false"
        >
          Contact
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade p-4 show active"
        id="home-tab-pane"
        role="tabpanel"
        aria-labelledby="home-tab"
        tabindex="0"
      >
        <div class="card" data-bs-theme="dark">
          <div class="card-header d-grid gap-3">
            <div class="d-flex gap-3 p-2">
              <div class="justify-content-xxl-endalign-middle me-auto text-center">
                <h4>Usuários</h4>
              </div>
              <div class="justify-content-xxl-end">
                <a class="btn btn-outline-success me-2 fw-bold" id="download-button" href="#"
                  >Cadastrar usuário</a
                >
                <button type="button" class="btn btn-outline-warning me-2 fw-bold">
                  Encerrar Execução
                </button>
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
              <!-- <template #column-7="props">
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
              </template> -->
              <tfoot>
                <tr>
                  <th>#</th>
                  <th>Login</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                </tr>
              </tfoot>
            </DataTable>
            <!-- <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Login</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-Mail</th>
                </tr>
              </thead>
              <tbody v-for="item in items" :key="item.id">
                <tr>
                  <th scope="row">{{ item.id }}</th>
                  <td>{{ item.login }}</td>
                  <td>{{ item.nome_usuario }}</td>
                  <td>{{ item.email }}</td>
                </tr>
              </tbody>
            </table> -->
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="profile-tab-pane"
        role="tabpanel"
        aria-labelledby="profile-tab"
        tabindex="0"
      >
        ...
      </div>
      <div
        class="tab-pane fade"
        id="contact-tab-pane"
        role="tabpanel"
        aria-labelledby="contact-tab"
        tabindex="0"
      >
        ...
      </div>
    </div>
  </div>
</template>
