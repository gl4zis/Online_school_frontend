<template>
  <div class="alert" @click="alertStore.removeAlert()">
    <h3 v-text="props.header"></h3>
    <p v-text="props.message"></p>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {useAlertStore} from "@/stores/AlertStore";

const alertStore = useAlertStore()

const props = defineProps({
  header: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.alert {
  padding: 16px;
  width: 40vw;
  text-align: left;
  position: fixed;
  bottom: 2vh;
  left: 30vw;

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: #555555;
  }
}

.message {
  background-color: #4D4DFF1A;

  h3 {
    color: #4D4DFF;
  }
}

.warning {
  background-color: #FFBA001A;

  h3 {
    color: #FFBA00;
  }
}

.ok {
  border-left: 4px solid #2EC946;
  background-color: #2EC9461A;

  h3 {
    color: #2EC946;
  }
}

.error {
  border: 1px solid #FF383844;
  border-radius: 8px;
  background-color: #FF38381A;

  h3 {
    color: #A00;
  }
}
</style>