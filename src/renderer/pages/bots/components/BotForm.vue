<script setup lang="ts">
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { addFiles } from "@shared/FormConfig";
import { BRow } from "bootstrap-vue-next";
import { ref } from "vue";
import DropZone from "./FileDropZone.vue";
const need_files = ref(true);
</script>

<template>
  <BModal no-footer id="ModalFormBot" data-bs-theme="dark" size="xl" centered class="text-white">
    <BForm id="FormBot">
      <BRow v-if="need_files">
        <BCol md="3" class="mb-3">
          <BCard>
            <BCardBody>
              <DropZone
                @files-dropped="addFiles"
                #default="{ dropZoneActive }"
                style="height: 200px"
              >
                <div v-if="dropZoneActive" class="hover_transition">
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
            </BCardBody>
          </BCard>
        </BCol>
        <BCol md="9" class="mb-3">
          <BCard>
            <BCardText> </BCardText>
          </BCard>
        </BCol>
      </BRow>
      <div class="col-12 mb-3 p-3 border border-2 rounded rounded-4">
        <BFormCheckbox
          id="checkbox-1"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
        >
          Confirmo que os dados inseridos estão corretos
        </BFormCheckbox>
      </div>
      <BButton class="col-12" id="InitBot" type="submit" variant="outline-success">
        <span class="fw-bold">Iniciar Execução</span>
      </BButton>
    </BForm>
  </BModal>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 2s ease;
}

.hover_transition {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

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
</style>
