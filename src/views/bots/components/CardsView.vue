<script setup lang="ts">
import { api } from "@/defaults/axios";
import manager from "@/resouces/socketio";
import { faAngleRight, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BModal, useModal } from "bootstrap-vue-next";
import { computed, reactive, ref } from "vue";
import type { BotInfo, ResponseConfigForm } from "./types";

const { show: showForm } = useModal("FormBot");
const botlist = ref<BotInfo[]>([]);
const botsSocket = manager.socket("/bots");
const opacity = ref(0.18);
const overlayFormBot = ref(false);
const ex1Options = ref([{ value: null, text: "Selecione uma Vara/Foro", disabled: true }]);
const ex2Options = ref([{ value: null, text: "Selecione uma credencial", disabled: true }]);
const ex3Options = ref([{ value: null, text: "Selecione um estado", disabled: true }]);
const ex4Options = ref([{ value: null, text: "Selecione um Cliente", disabled: true }]);
const currentConfig = ref<string[]>([]);
const Form = reactive<{ [key: string]: null }>({
  xlsx: null,
  cred: null,
  state: null,
  client: null,
  parte_name: null,
  doc_parte: null,
  data_inicio: null,
  data_fim: null,
  polo_parte: null,
  vara: null,
});
const EnableInputs = reactive<{ [key: string]: boolean }>({
  xlsx: false,
  cred: false,
  state: false,
  client: false,
  otherfiles: false,
  parte_name: false,
  doc_parte: false,
  data_inicio: false,
  data_fim: false,
  polo_parte: false,
  varas: false,
});
const list = [
  { msg: "Bruce Lee" },
  { msg: "Jackie Chan" },
  { msg: "Chuck Norris" },
  { msg: "Jet Li" },
  { msg: "Kung Fury" },
];
const query = ref("");
const TitleForm = ref("");

const computedList = computed(() => {
  return list.filter((item) => item.msg.toLowerCase().includes(query.value));
});

async function show_form(item: BotInfo) {
  TitleForm.value = item.display_name;
  try {
    const resp: ResponseConfigForm = await api.get(
      `/bot/get_form?classification=${item.classification}&form_cfg=${item.form_cfg}`,
    );

    if (resp.data?.config) {
      resp.data.config.map((cfg) => {
        EnableInputs[cfg] = true;
        if (cfg === "client") {
          if (item.client === "EVERYONE" || item.client === "GLOBAL") {
            EnableInputs[cfg] = false;
          }
        }
      });
      currentConfig.value = resp.data.config;
    }
  } catch {
    //
  }

  showForm();
}

function hideInputs() {
  const config = currentConfig.value;

  Array.from(config).map((cfg) => {
    EnableInputs[cfg] = false;
  });

  Object.entries(Form).map(([key]) => {
    Form[key] = null;
  });
}

async function handleSubmit(e: Event) {
  e.preventDefault();
}
botsSocket.emit("bots_list", (bots_list: BotInfo[]) => {
  botlist.value = bots_list;
});
</script>

<template>
  <div class="row">
    <div class="col-md-3">
      <div class="card" style="height: 75dvh">
        <div class="card-header d-flex">
          <span class="title align-items-center d-flex">
            <IBiPieChartFill />
            <span class="ms-1"> Categorias </span>
          </span>
          <div class="ms-auto">
            <input class="form-control" placeholder="Filtre aqui.." type="text" v-model="query" />
          </div>
        </div>
        <div class="card-body">
          <TransitionGroup name="slide-fade" class="list-group" tag="ul">
            <li
              class="list-group-item list-group-item-action"
              v-for="(item, index) in computedList"
              :key="index"
            >
              {{ item.msg }}
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>
    <div class="col-9 row">
      <div class="col-xl-3 col-md-6" v-for="item in botlist" :key="item.id">
        <div class="card bg-body-tertiary text-white mb-4">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="text-card d-flex flex-column">
              <span class="fs-6 fw-bold text-body-secondary">{{ item.display_name }}</span>
            </div>
            <div class="fw-bold bg-primary p-3 rounded rounded-4 bg-opacity-50">
              <FontAwesomeIcon :icon="faRobot" size="xl" />
            </div>
          </div>
          <div class="card-footer d-flex align-items-center justify-content-between">
            <button class="btn" @click="show_form(item)">
              <span class="small text-white stretched-link">Mais Detalhes</span>
            </button>
            <div class="small text-white">
              <FontAwesomeIcon :icon="faAngleRight" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BModal
    size="lg"
    id="FormBot"
    centered
    :title="TitleForm"
    footer-class="d-flex"
    as="form"
    no-footer
    @hide="hideInputs"
  >
    <BOverlay class="p-3" :show="overlayFormBot" :opacity="opacity" rounded="md">
      <form @submit="handleSubmit" class="row">
        <div class="col-12 mb-3" v-if="EnableInputs.xlsx">
          <BFormFile size="md" />
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.vara">
          <BFormSelect size="md" v-model="Form.vara" :options="ex1Options" />
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.creds">
          <BFormSelect size="md" v-model="Form.cred" :options="ex2Options" />
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.state">
          <BFormSelect size="md" v-model="Form.state" :options="ex3Options" />
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.client">
          <BFormSelect size="md" v-model="Form.client" :options="ex4Options" />
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.parte_name">
          <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
            <BFormInput id="input-floating-nome" :state="null" trim placeholder="..." />
          </BFormGroup>
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.polo_parte">
          <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
            <BFormInput id="input-floating-nome" :state="null" trim placeholder="..." />
          </BFormGroup>
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.doc_parte">
          <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
            <BFormInput id="input-floating-nome" :state="null" trim placeholder="..." />
          </BFormGroup>
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.data_inicio">
          <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
            <BFormInput type="date" id="input-floating-nome" :state="null" trim placeholder="..." />
          </BFormGroup>
        </div>
        <div class="col-12 mb-3" v-if="EnableInputs.data_fim">
          <BFormGroup id="fieldset-nome" label="Nome" label-for="input-floating-nome" floating>
            <BFormInput type="date" id="input-floating-nome" :state="null" trim placeholder="..." />
          </BFormGroup>
        </div>
        <hr />
        <div class="d-flex flex-column mt-2">
          <BButton type="submit" variant="success" size="lg">
            <strong> Salvar </strong>
          </BButton>
        </div>
      </form>
    </BOverlay>
  </BModal>
</template>

<style lang="css" scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
