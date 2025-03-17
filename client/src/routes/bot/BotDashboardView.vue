<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onBeforeMount, onMounted, ref } from "vue";

// Global Components
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
import BotForm from "./components/BotForm.vue";

const items = () => {
  const data: Array<Record<string, string | number>> = [
    {
      id: 1,
      display_name: "PROJUDI - CAPA",
      system: "PROJUDI",
      state: "AM",
      client: "EVERYONE",
      type: "CAPA",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por trazer a capa do processo em uma planilha",
    },
    {
      id: 2,
      display_name: "PROJUDI - MOVIMENTACAO",
      system: "PROJUDI",
      state: "AM",
      client: "EVERYONE",
      type: "MOVIMENTACAO",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por busca de movimentações processuais",
    },
    {
      id: 3,
      display_name: "PROJUDI - BUSCA PROCESSOS",
      system: "PROJUDI",
      state: "AM",
      client: "EVERYONE",
      type: "PROC_PARTE",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por fazer busca utilizando nome de partes do processo",
    },
    {
      id: 4,
      display_name: "PROJUDI - PROTOCOLO",
      system: "PROJUDI",
      state: "AM",
      client: "EVERYONE",
      type: "PROTOCOLO",
      form_cfg: "multipe_files",
      classification: "JURIDICO",
      text: "Robô responsável por  peticionamento em lotes",
    },
    {
      id: 5,
      display_name: "ESAJ - CAPA",
      system: "ESAJ",
      state: "AM",
      client: "EVERYONE",
      type: "CAPA",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por trazer a capa do processo em uma planilha",
    },
    {
      id: 6,
      display_name: "ESAJ - MOVIMENTACAO",
      system: "ESAJ",
      state: "AM",
      client: "EVERYONE",
      type: "MOVIMENTACAO",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por busca de movimentações processuais",
    },
    {
      id: 7,
      display_name: "ESAJ - BUSCA PROCESSOS",
      system: "ESAJ",
      state: "AM",
      client: "EVERYONE",
      type: "PROC_PARTE",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por fazer busca utilizando nome de partes do processo",
    },
    {
      id: 8,
      display_name: "ESAJ - PROTOCOLO",
      system: "ESAJ",
      state: "AM",
      client: "EVERYONE",
      type: "PROTOCOLO",
      form_cfg: "multipe_files",
      classification: "JURIDICO",
      text: "Robô responsável por  peticionamento em lotes",
    },
    {
      id: 9,
      display_name: "ESAJ - BUSCA PAGAMENTOS",
      system: "ESAJ",
      state: "AM",
      client: "EVERYONE",
      type: "BUSCA_PAGS",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por buscar pagamentos feitos em processos",
    },
    {
      id: 10,
      display_name: "ESAJ - EMISSÃO GUIAS",
      system: "ESAJ",
      state: "AM",
      client: "EVERYONE",
      type: "EMISSOR",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por emissão de guias",
    },
    {
      id: 11,
      display_name: "ELAW - ENCERRAMENTOS",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "ENCERRA",
      form_cfg: "file_auth",
      classification: "ADMINISTRATIVO",
      text: "Robô responsável por encerramento de processos",
    },
    {
      id: 12,
      display_name: "ELAW - PRE-CADASTRO",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "CADASTRO",
      form_cfg: "file_auth",
      classification: "ADMINISTRATIVO",
      text: "Robô responsável por realizar pré cadastro de processos",
    },
    {
      id: 13,
      display_name: "ELAW - COMPL. CADASTRO",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "COMPLEMENT",
      form_cfg: "file_auth",
      classification: "ADMINISTRATIVO",
      text: "Robô responsável por complemento de cadastro",
    },
    {
      id: 14,
      display_name: "ELAW - PAGAMENTO",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "SOL_PAGS",
      form_cfg: "multipe_files",
      classification: "ADMINISTRATIVO",
      text: "Robô responsável por solicitação de pagamentos",
    },
    {
      id: 15,
      display_name: "ELAW - ANDAMENTOS",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "ANDAMENT",
      form_cfg: "multipe_files",
      classification: "ADMINISTRATIVO",
      text: "Robô responsável por inserção de andamentos",
    },
    {
      id: 16,
      display_name: "ELAW - PROVISIONAMENTO",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "PROVISAO",
      form_cfg: "file_auth",
      classification: "ADMINISTRATIVO",
      text: "Robô responsável por provisionar valores",
    },
    {
      id: 17,
      display_name: "ELAW - DOWNLOAD DOC.",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "DOWNLOAD",
      form_cfg: "file_auth",
      classification: "ADMINISTRATIVO",
      text: "Robô responsável por baixar documentos",
    },
    {
      id: 18,
      display_name: "CAIXA - EMISSÃO GUIAS",
      system: "CAIXA",
      state: "AM",
      client: "GLOBAL",
      type: "EMISSOR",
      form_cfg: "only_file",
      classification: "JURIDICO",
      text: "Robô responsável por emissão de guias",
    },
    {
      id: 19,
      display_name: "TJDFT - CALCULADORA",
      system: "TJDFT",
      state: "EVERYONE",
      client: "EVERYONE",
      type: "CALCULO",
      form_cfg: "only_file",
      classification: "JURIDICO",
      text: "Robô de emissão de cálculo de atualização monetária",
    },
    {
      id: 20,
      display_name: "PJE - PAUTA AUDIÊNCIAS",
      system: "PJE",
      state: "AM",
      client: "EVERYONE",
      type: "PAUTA",
      form_cfg: "file_auth",
      classification: "JURIDICO",
      text: "Robô responsável por extrair pautas do Pje",
    },
    {
      id: 21,
      display_name: "ELAW - PRAZOS",
      system: "ELAW",
      state: "EVERYONE",
      client: "AME - AMAZONAS ENERGIA",
      type: "PRAZOS",
      form_cfg: "multipe_files",
      classification: "ADMINISTRATIVO",
      text: "Prazos Elaw",
    },
  ];

  return data;
};
</script>

<template>
  <NavBarComponent />
  <div id="content" class="mt-4 mb-4">
    <SideBarComponent />
    <main>
      <BContainer fluid class="px-4">
        <div class="row">
          <div class="col-md-3 p-4 end-0" v-for="item in items()" :key="item.id">
            <BCard
              v-if="item.system == 'PROJUDI'"
              class="bg-secondary bg-opacity-25"
              header-tag="header"
              header-class="bg-secondary text-white  bg-opacity-75"
              footer-tag="footer"
              footer-class="bg-secondary text-white bg-opacity-75"
              tag="article"
            >
              <BCardImg
                src="/client/src/assets/projudi.png"
                class="bg-white mb-3 p-3 bg-opacity-75 rounded"
                alt="Image"
                overlay
              />
              <template #header>
                <span class="fw-bold">{{ item.display_name }}</span>
              </template>
              <BCardBody style="height: 6rem" class="bg-white bg-opacity-75 rounded">
                <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
              </BCardBody>

              <template #footer>
                <BButton class="d-grid gap-2" v-b-modal.ModalFormBot variant="success"
                  ><em>Acessar Robô</em></BButton
                >
              </template>
            </BCard>
            <BCard
              v-else-if="item.system == 'ELAW'"
              class="bg-secondary bg-opacity-25"
              header-tag="header"
              header-class="bg-secondary text-white  bg-opacity-75"
              footer-tag="footer"
              footer-class="bg-secondary text-white bg-opacity-75"
              tag="article"
            >
              <BCardImg
                src="/client/src/assets/elaw.svg"
                class="bg-white mb-3 p-3 bg-opacity-75 rounded"
                alt="Image"
                overlay
              />
              <template #header>
                <span class="fw-bold">{{ item.display_name }}</span>
              </template>
              <BCardBody style="height: 6rem" class="bg-white bg-opacity-75 rounded">
                <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
              </BCardBody>

              <template #footer>
                <BButton class="d-grid gap-2" v-b-modal.ModalFormBot variant="success"
                  ><em>Acessar Robô</em></BButton
                >
              </template>
            </BCard>
            <BCard
              v-else-if="item.system == 'ESAJ'"
              class="bg-secondary bg-opacity-25"
              header-tag="header"
              header-class="bg-secondary text-white  bg-opacity-75"
              footer-tag="footer"
              footer-class="bg-secondary text-white bg-opacity-75"
              tag="article"
            >
              <BCardImg
                src="/client/src/assets/esaj.svg"
                class="bg-white mb-3 p-3 bg-opacity-75 rounded"
                alt="Image"
                overlay
              />
              <template #header>
                <span class="fw-bold">{{ item.display_name }}</span>
              </template>
              <BCardBody style="height: 6rem" class="bg-white bg-opacity-75 rounded">
                <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
              </BCardBody>

              <template #footer>
                <BButton class="d-grid gap-2" v-b-modal.ModalFormBot variant="success"
                  ><em>Acessar Robô</em></BButton
                >
              </template>
            </BCard>
            <BCard
              v-else-if="item.system == 'CAIXA'"
              class="bg-secondary bg-opacity-25"
              header-tag="header"
              header-class="bg-secondary text-white  bg-opacity-75"
              footer-tag="footer"
              footer-class="bg-secondary text-white bg-opacity-75"
              tag="article"
            >
              <BCardImg
                src="/client/src/assets/caixa.svg"
                class="bg-white mb-3 p-3 bg-opacity-75 rounded"
                alt="Image"
                overlay
              />
              <template #header>
                <span class="fw-bold">{{ item.display_name }}</span>
              </template>
              <BCardBody style="height: 6rem" class="bg-white bg-opacity-75 rounded">
                <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
              </BCardBody>

              <template #footer>
                <BButton class="d-grid gap-2" v-b-modal.ModalFormBot variant="success"
                  ><em>Acessar Robô</em></BButton
                >
              </template>
            </BCard>
            <BCard
              v-else-if="item.system == 'PJE'"
              class="bg-secondary bg-opacity-25"
              header-tag="header"
              header-class="bg-secondary text-white  bg-opacity-75"
              footer-tag="footer"
              footer-class="bg-secondary text-white bg-opacity-75"
              tag="article"
            >
              <BCardImg
                src="/client/src/assets/esaj.svg"
                class="bg-white mb-3 p-3 bg-opacity-75 rounded"
                alt="Image"
                overlay
              />
              <template #header>
                <span class="fw-bold">{{ item.display_name }}</span>
              </template>
              <BCardBody style="height: 6rem" class="bg-white bg-opacity-75 rounded">
                <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
              </BCardBody>

              <template #footer>
                <BButton class="d-grid gap-2" v-b-modal.ModalFormBot variant="success"
                  ><em>Acessar Robô</em></BButton
                >
              </template>
            </BCard>
            <BCard
              v-else-if="item.system == 'TJDFT'"
              class="bg-secondary bg-opacity-25"
              header-tag="header"
              header-class="bg-secondary text-white  bg-opacity-75"
              footer-tag="footer"
              footer-class="bg-secondary text-white bg-opacity-75"
              tag="article"
            >
              <BCardImg
                src="/client/src/assets/esaj.svg"
                class="bg-white mb-3 p-3 bg-opacity-75 rounded"
                alt="Image"
                overlay
              />
              <template #header>
                <span class="fw-bold">{{ item.display_name }}</span>
              </template>
              <BCardBody style="height: 6rem" class="bg-white bg-opacity-75 rounded">
                <span class="overflow-auto" style="height: 50rem">{{ item.text }} </span>
              </BCardBody>

              <template #footer>
                <BButton class="d-grid gap-2" v-b-modal.ModalFormBot variant="success"
                  ><em>Acessar Robô</em></BButton
                >
              </template>
            </BCard>
          </div>
        </div>
      </BContainer>
    </main>
  </div>
  <BotForm />
</template>
