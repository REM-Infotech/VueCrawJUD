<template>
  <button id="eye">
    <img src="@/assets/image.png" alt="" width="18" height="16" />
  </button>
</template>

<style lang="css">
#eye {
  position: absolute;
  right: 10px; /* 10px do lado direito do input */
  top: 45%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  cursor: pointer;
}

@media (max-width: 800px) {
  #eye {
    display: none;
    visibility: hidden;
  }
}

@media (max-height: 768px) {
  #eye {
    display: none;
    visibility: hidden;
  }
}
</style>
