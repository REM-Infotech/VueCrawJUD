<script setup lang="ts">
import manager from "@/resouces/socketio";
import { faAngleRight, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref } from "vue";

interface BotInfo {
  id: number;
  display_name: string;
  system: string;
  state: string;
  client: string;
  type: string;
  form_cfg: string;
  classification: string;
  text: string;
}

const botlist = ref<BotInfo[]>([]);

const botsSocket = manager.socket("/bots");

botsSocket.emit("bots_list", (bots_list: BotInfo[]) => {
  console.log(bots_list);
  botlist.value = bots_list;
});

const list = [
  { msg: "Bruce Lee" },
  { msg: "Jackie Chan" },
  { msg: "Chuck Norris" },
  { msg: "Jet Li" },
  { msg: "Kung Fury" },
];

const query = ref("");

const computedList = computed(() => {
  return list.filter((item) => item.msg.toLowerCase().includes(query.value));
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
            <a class="small text-white stretched-link" href="#">Mais detalhes</a>
            <div class="small text-white">
              <FontAwesomeIcon :icon="faAngleRight" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
