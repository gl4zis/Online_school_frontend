<template>
  <div class="card">
    <Image :src="image || courseImage"/>
    <h3>{{ course.name }}</h3>
    <p>{{ course.summary }}</p>
    <Chip :label="course.subject"/>
    <p v-if="teacher">Teacher: <b>{{ teacher }}</b></p>
    <p>Only: <i>{{ course.price }}</i> rubles!</p>
  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType, ref} from 'vue'
import {Course} from "@/service/dtoInterfaces";
import Image from 'primevue/image'
import courseImage from '@/assets/course_image.jpg'
import serverApi from '@/service/server'
import Chip from 'primevue/chip';

const props = defineProps({
  course: {
    type: Object as PropType<Course>,
    required: true
  }
})

const teacher = ref('')
serverApi.getAnotherProfile(props.course.teacherId).then(resp => {
  if (resp.status === 200)
    teacher.value = resp.firstname + ' ' + resp.lastname
})

const image = ref('')
if (props.course.imageId)
  serverApi.getFile(props.course.imageId).then(resp => image.value = resp.message)
</script>

<style scoped lang="scss">
.card {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  height: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>