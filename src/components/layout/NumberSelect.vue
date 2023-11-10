<template>
  <div>
    <select>
      <option v-for="index in range"
              :key="index"
              :value="getVal(index)"
      >{{ getVal(index) }}</option>
    </select>
    <span class="label">{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  text: String
})

const range: number = props.max - props.min + 1
const getVal = (idx: number): number => {
  return Number(props.min) + idx - 1
}
</script>

<style scoped lang="scss">
@import "@/styles/variables";
div {
  position: relative;

  select {
    width: 50px;
    height: 40px;
    text-align: center;
    padding: 15px 0 0 0;
    font-size: 12pt;
    appearance: none;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }

  .label {
    pointer-events: none;
    position: absolute;
    color: $base-color;
    font-size: 9pt;
    top: 2px;
    left: 5px;
  }
}
</style>