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
import {defineEmits, defineExpose, defineProps, PropType, ref, Ref} from 'vue'
import {emailValidMessage, usernameValidMessage} from "@/service/validation";
import {profileStore} from "@/stores/profileStore";
import {MessageResponse} from "@/service/dtoInterfaces";
import serverApi from '@/service/server'
import toastApi from "@/service/toast";

export type paramType = 'username' | 'email' | 'course-name'

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
    if (!validMessage.value)
      validate()
    return !validMessage.value
  }
})

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
  validate(500)
}

function validate(delay?: number): void {
  clearTimeout(checkId)
  validMessage.value = ''

  if (props.paramType === 'username')
    validMessage.value = usernameValidMessage(curVal.value)
  else if (props.paramType === 'email')
    validMessage.value = emailValidMessage(curVal.value)

  if (!validMessage.value) {
    if (delay)
      checkId = setTimeout(checkUniqueness, delay)
    else
      checkUniqueness()
  }
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
  let res: MessageResponse
  switch (props.paramType) {
    case 'username':
      res = await serverApi.usernameUnique(curVal.value)
      break
    case 'email':
      res = await serverApi.emailUnique(curVal.value)
      break
    case 'course-name':
      res = await serverApi.courseNameUnique(curVal.value)
  }

  if (res.status !== 200) {
    icon.value = ''
    toastApi.noConnection()
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