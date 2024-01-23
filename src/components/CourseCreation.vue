<template>
  <Dialog :visible="true" modal>
    <template #container>
      <Card class="form">
        <template #header>
          <BackButton/>
        </template>
        <template #title>
          <h2>Create new course</h2>
        </template>
        <template #content>

        </template>
      </Card>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import BackButton from "@/components/BackButton.vue";
import Card from "primevue/card";
</script>

<style scoped lang="scss">

</style>