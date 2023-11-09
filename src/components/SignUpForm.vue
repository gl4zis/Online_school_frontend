<template>
  <section class="form">
    <BackButton class="back"/>
    <h2>Sign Up</h2>
  </section>
</template>


<script setup lang="ts">

import BackButton from "@/components/layout/BackButton.vue";
</script>

<style scoped lang="scss">
@import "@/styles/variables";

section.form {
  position: relative;
  top: 10vh;
  background-color: $base-color;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  width: 40vw;
  color: white;
  padding: 5px;
  font-size: 13pt;

  .back {
    position: absolute;
    top: 0;
    left: 15px;
    color: white;

    &:active {
      border-color: black;
    }
  }

  * {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 24pt;
    width: 100%;
  }

}
</style>