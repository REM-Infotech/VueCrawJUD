<script setup lang="ts">
import type { TFormBot } from "@/@types/FormBot";
import FormFileCfg from "@/renderer/services/Bot/FormFileCfg";
import FormRefs from "@/renderer/services/Bot/FormRefs";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useModal } from "bootstrap-vue-next";
import { computed, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import DropZone from "./FileDropZone.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { show: show_load, hide: hide_load } = useModal("modal-load");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { show: show_message } = useModal("ModalMessage");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { show: show_form } = useModal("ModalForm");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = useRouter();

const { addFiles } = FormFileCfg();
const { files, checked_state, column_size, dynamic_size } = FormRefs();

const addfiles_ = (filesAppend: File[]) => {
  console.log(filesAppend);

  const filesPush = addFiles(filesAppend, files);

  FormBot.files.push(...filesPush);
  files.value.push(...filesPush);
};

const columns = {};

const FormBot = reactive<TFormBot>({
  system: "",
  state_client: {
    selected: null,
    items: [{ value: null, text: "Carregando" }],
  },
  credentials: {
    selected: null,
    items: [{ value: null, text: "Carregando" }],
  },
  type: "",
  files: [],
  need_files: true,
  need_options: true,
  bot_protocolo: false,
  state_client_type: "",
});

const credentials_computed = computed(() => {
  return FormBot.credentials.selected !== null;
});
const state_client_computed = computed(() => {
  return FormBot.state_client.selected !== null;
});

const checked_state_computed = computed(() => {
  return checked_state.value;
});

const FilesListable = () => {
  return FormBot.files.map((file, index) => {
    return {
      id: index,
      name: file.name,
    };
  });
};

watch(FormBot.files, () => {
  console.log(files);

  const file_lenght = files.value.length > 0;

  if (file_lenght) {
    column_size.value = 6;
    dynamic_size.value = "xl";
  } else {
    column_size.value = 12;
    dynamic_size.value = "md";
  }
});
</script>

<template>
  <BModal
    no-footer
    id="ModalFormBot"
    data-bs-theme="dark"
    :size="dynamic_size"
    centered
    class="text-white"
  >
    <BForm id="FormBot">
      <BRow>
        <BCol :md="column_size">
          <BRow>
            <BCol md="12">
              <BFormSelect
                :state="credentials_computed"
                v-model="FormBot.credentials.selected"
                :options="FormBot.credentials.items"
                class="mb-3"
              />
            </BCol>
            <BCol md="12">
              <BFormSelect
                :state="state_client_computed"
                v-model="FormBot.state_client.selected"
                :options="FormBot.state_client.items"
                class="mb-3"
              />
            </BCol>
            <BCol md="12">
              <DropZone
                v-model="FormBot.files"
                class="rounded rounded-4 p-3 mb-4 bg-secondary bg-opacity-25 text-white drop-area d-flex justify-content-center align-items-center"
                @files-dropped="addfiles_"
                #default="{ dropZoneActive }"
                style="height: 15rem"
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
            </BCol>
          </BRow>
        </BCol>
        <Transition>
          <BCol v-if="files.length > 0" :md="column_size">
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
          </BCol>
        </Transition>
      </BRow>

      <hr class="mt-3 mb-3" />

      <div class="d-grid">
        <BFormCheckbox
          v-model="checked_state"
          :state="checked_state_computed"
          @click="!checked_state"
          id="checkbox-1"
          name="checkbox-1"
          :value="true"
          :unchecked-value="false"
          class="mb-3"
        >
          Confirmo que os dados inseridos estão corretos
        </BFormCheckbox>
        <BButton id="InitBot" type="submit" variant="outline-success">
          <span class="fw-bold">Iniciar Execução</span>
        </BButton>
      </div>
    </BForm>
  </BModal>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
