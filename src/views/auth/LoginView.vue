<template>
  <div class="d-flex flex-column justify-content-center align-items-center h-100">
    <h1>Hello, world!</h1>
    <div class="margin-auto card-purple d-flex flex-column p-3">
      <input class="input-form" type="text" />
      <input class="input-form" type="text" />
    </div>
    <h1>Hello, world!</h1>
  </div>
</template>

<style lang="scss" scoped>
.card-purple {
  background-color: purple;
  border-radius: 5px;
  padding: 10px;
}

.input-form {
  border: 3px;
  border-color: rgb(61, 11, 61);
  border-style: solid;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 25px;
  padding: 5px;
}

.margin-auto {
  margin-top: auto;
  margin-bottom: auto;
}

.flex-column {
  flex-direction: column;
}

.h-100 {
  height: 100%;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}
.align-items-center {
  align-items: center;
}
</style>
