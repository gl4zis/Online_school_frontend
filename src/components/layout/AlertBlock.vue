<template>
  <transition name="alert">
    <div v-if="alert"
         class="alert"
         :class="alert.type"
         @click="remove"
    >
      <h3 v-text="alert.header"></h3>
      <p v-text="alert.message"></p>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {defineProps, PropType} from "vue";
import {Alert, useAlertStore} from "@/stores/AlertStore";

defineProps({
  alert: {
    type: Object as PropType<Alert>,
    required: false,
    default: null
  }
})

function remove(): void {
  const alertStore = useAlertStore()
  alertStore.removeAlert()
}
</script>

<style scoped lang="scss">
@import "@/styles/variables";

$error-color: #FF3838;
$ok-color: #2EC946;
$message-color: #4D4DFF;
$warning-color: #FB0;

.alert {
  z-index: 2;
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
    color: $base-color;
  }

  &-enter-from {
    transform: translateY(200%);
  }

  &-leave-to {
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition-duration: .3s;
  }
}

.message {
  background-color: rgba($message-color, 0.1);

  h3 {
    color: $message-color;
  }
}

.warning {
  background-color: rgba($warning-color, 0.1);

  h3 {
    color: $warning-color;
  }
}

.ok {
  border-left: 4px solid $ok-color;
  background-color: rgba($ok-color, 0.1);

  h3 {
    color: $ok-color;
  }
}

.error {
  border: 1px solid rgba($error-color, 0.25);
  border-radius: 8px;
  background-color: rgba($error-color, 0.1);

  h3 {
    color: $error-color;
  }
}
</style>