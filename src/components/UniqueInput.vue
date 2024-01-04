<template>
  <FormInput :model-value="modelValue"
             :icon="icon"
             :valid-error="validMessage"
             :label="label"
             :disabled="disabled"
             @input="onInputValidation"/>
</template>

<script setup lang="ts">
import FormInput from "@/components/FormInput.vue";
import {defineProps, defineEmits, defineExpose, ref, PropType, Ref} from 'vue'
import {emailValidMessage, usernameValidMessage} from "@/service/validation";
import {profileStore} from "@/stores/profileStore";
import {MessageResponse} from "@/service/dtoInterfaces";
import serverApi from '@/service/server'
import toastApi from "@/service/toast";
import {useToast} from "primevue/usetoast";

export type paramType = 'username' | 'email'

const props = defineProps({
  modelValue: String,
  disabled: Boolean,
  paramType: {
    type: String as PropType<paramType>,
    required: true
  },
  checkSelf: Boolean,
  label: String
})

const emit = defineEmits(['update:modelValue'])
defineExpose({
  reset,
  isValid: (): boolean => {
    validate(false)
    return !validMessage.value
  }
})

const toast = useToast()

const icon = ref('')
const validMessage = ref('')
let checkId = 0
let curVal: Ref<string> = ref(props.modelValue || '')

const ICON_OK = 'pi pi-check'
const ICON_LOAD = 'pi pi-spin pi-spinner'
const ICON_FAIL = 'pi pi-times'

function onInputValidation(event: InputEvent): void {
  curVal.value = event.target?.value
  emit('update:modelValue', curVal.value)
  validate(true)
}

function validate(checkUnique: boolean): void {
  clearTimeout(checkId)
  validMessage.value = props.paramType === 'username' ?
      usernameValidMessage(curVal.value) : emailValidMessage(curVal.value)
  if (checkUnique && !validMessage.value)
    checkId = setTimeout(checkUniqueness, 500)
}

async function checkUniqueness(): Promise<void> {
  if (!curVal.value)
    return

  if (props.checkSelf) {
    if (props.paramType === 'username' &&
        profileStore.profile?.username === curVal.value) {
      icon.value = ICON_OK
      return
    } else if (props.paramType === 'email' &&
        profileStore.profile?.email === curVal.value) {
      icon.value = ICON_OK
      return
    }
  }

  icon.value = ICON_LOAD
  const res: MessageResponse = props.paramType === 'username' ?
      await serverApi.usernameUnique(curVal.value) : await serverApi.emailUnique(curVal.value)

  if (res.status !== 200) {
    icon.value = ''
    toastApi.noConnection(toast)
    return
  }

  if (res.message === 'true')
    icon.value = ICON_OK
  else {
    icon.value = ICON_FAIL
    validMessage.value = 'Already taken'
  }
}

function reset(value?: string): void {
  icon.value = ''
  validMessage.value = ''

  if (value)
    curVal.value = value
  else
    curVal.value = ''
  emit('update:modelValue', curVal.value)
}
</script>