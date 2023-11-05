<template>
  <header>
    <img src="@/assets/logo.png" alt="logo"/>
    <nav>
      <NavButton path="/" text="Home"/>
      <NavButton path="/courses" text="Courses"/>
      <NavButton path="/contacts" text="About As"/>
    </nav>
    <LoginButton/>
  </header>
</template>

<script setup lang="ts">

import NavButton from "@/components/NavButton.vue";
import LoginButton from "@/components/LoginButton.vue";
</script>

<style scoped lang="scss">
header {
  position: relative;
  top: 5vh;
  margin: auto;
  width: 80vw;
  height: 10vh;
  background-color: #FFFA;
  border-bottom: 1px solid grey;
  border-radius: 5px;
  color: #333;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  img {
    height: 60%;
  }

  nav {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 5vw;
  }
}
</style>