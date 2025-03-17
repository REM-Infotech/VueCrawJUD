<script setup lang="ts">
import TableComponent from "../../../components/TableComponent.vue";
</script>

<template>
  <BForm>
    <div class="row g-0">
      <div class="col-md-5 p-3">
        <TableComponent />
      </div>
      <div class="col-md-7 p-3">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
      </div>
    </div>
  </BForm>
</template>
