<template>
  <div class="alert"
        :class="{
          'ok': alertType == 'ok',
          'message': alertType == 'message',
          'warning': alertType == 'warning',
          'error': alertType == 'error'
        }"
        @click="remove">
    <h3 v-text="props.header"></h3>
    <p v-text="props.message"></p>
  </div>
</template>

<script setup lang="ts">
import {PropType, defineProps} from "vue";
import {Alert, AlertType, useAlertStore} from "@/stores/AlertStore";

const alertStore = useAlertStore()

const props = defineProps({
  alertType: {
    type: String as PropType<AlertType>,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

function remove() {
  const thisAlert: Alert = {
    type: props.alertType,
    header: props.header,
    message: props.message
  }
  alertStore.removeAlert(thisAlert)
}
</script>

<style scoped lang="scss">
.alert {
  width: 512px;
  padding: 16px;
  max-width: 25%;
  position: absolute;
  top: 4vh;
  left: 2vw;
  text-align: left;

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
    color: #FF3838;
  }
}
</style>