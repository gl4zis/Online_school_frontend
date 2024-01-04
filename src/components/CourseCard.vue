<template>
  <div class="card">
    <div class="corner">
      <div class="arrow">
        →
      </div>
    </div>
    <Image :src="image" @error="image = courseImage" width="350"/>
    <div class="info">
      <h3>{{ course.name }}</h3>
      <p>{{ course.summary }}</p>
      <Chip :label="course.subject"/>
      <p v-if="teacher">Teacher: <b>{{ teacher }}</b></p>
      <p>Only: <i>{{ course.price }}</i> rubles!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, PropType, Ref, ref} from 'vue'
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

const image: Ref<any> = ref(serverApi.getLinkOnImage(props.course?.imageId))
</script>

<style scoped lang="scss">
@import "@/assets/theme";

.card {
  top: 0;
  position: relative;
  border: 1px solid $card-color;
  background: $card-color;
  border-radius: 5px;
  padding: 10px;
  width: 350px;
  margin: 10px auto;
  transition: box-shadow, translate 0.3s ease-out;

  .corner {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    right: 0;
    background-color: $primary-color;
    border-radius: 0 5px 0 50px;

    .arrow {
      color: white;
      margin-top: 5px;
      margin-left: 8px;
      font-size: 18pt;
      font-family: courier, sans, serif;
    }
  }

  &:hover {
    box-shadow: 0 4px 8px #2223;
    translate: 0 -8px;
    border: 1px solid lightgrey;
    background-color: white;
  }

  .info {
    padding: 0 10px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>