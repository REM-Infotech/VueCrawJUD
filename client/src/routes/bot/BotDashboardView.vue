<script setup lang="ts">
import NavBarComponent from "../../components/NavBarComponent.vue";
import SideBarComponent from "../../components/SideBarComponent.vue";
</script>

<template>
  <NavBarComponent />
  <div id="content" class="mt-4 mb-4">
    <SideBarComponent />
    <main>
      <BContainer fluid="xl" class="px-4">
        <div class="card">
          <div class="card-header">
            <h1 class="mb-3">Dashboard</h1>
          </div>
          <BContainer fluid="xl" class="px-4"> </BContainer>
        </div>
      </BContainer>
    </main>
  </div>
</template>
