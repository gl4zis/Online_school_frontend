<template>
  <div class="card" :class="{ 'normal': size === 'normal', 'small': size === 'small' }">
    <div class="corner">
      <div class="arrow">
        →
      </div>
    </div>
    <Image :src="image" @error="image = courseImage" :width="size === 'small' ? 250 : 350"/>
    <div class="info">
      <h3>{{ course.name }}</h3>
      <p v-if="size === 'normal'">{{ course.summary }}</p>
      <Chip :label="course.subject"/>
      <p v-if="size === 'normal'">Teacher: <b>{{ teacher }}</b></p>
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

type Size = 'normal' | 'small'

const props = defineProps({
  course: {
    type: Object as PropType<Course>,
    required: true
  },
  size: {
    type: String as PropType<Size>,
    default: 'normal'
  }
})

const teacher = ref('')
serverApi.getAnotherProfile(props.course.teacherId).then(resp => {
  if (resp.status === 200)
    teacher.value = resp.firstname + ' ' + resp.lastname
})

const image: Ref<any> = ref(serverApi.getLinkOnImage(props.course?.imageId, props.size === 'normal' ? 350 : 250))
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
  margin: 10px auto;
  transition: box-shadow, translate 0.3s ease-out;

  &.normal {
    width: 350px;

    .corner {
      width: 50px;
      height: 50px;
      border-radius: 0 5px 0 50px;

      .arrow {
        margin-top: 5px;
        margin-left: 8px;
        font-size: 18pt;
      }
    }
  }

  &.small {
    width: 250px;

    .corner {
      width: 30px;
      height: 30px;
      border-radius: 0 5px 0 30px;

      .arrow {
        margin-top: 3px;
        margin-left: 12px;
        font-size: 14pt;
      }
    }
  }

  .corner {
    position: absolute;
    top: 0;
    right: 0;
    background-color: $primary-color;

    .arrow {
      color: white;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>