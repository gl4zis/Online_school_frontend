<template>
  <div class="card">
      <Image :src="photo || defaultUserIcon" width="250"></Image>
      <div class="info">
        <h3>{{ teacher.lastname }} {{ teacher.firstname }}
          <template v-if="teacher.birthdate">
            , {{ calculateAge(new Date(teacher.birthdate)) }} years
          </template>
        </h3>
        <div class="subjects">
          <Chip v-for="(subject, index) in teacher.subjects"
                :key="index"
                :label="subject"/>
        </div>
        <div>{{ teacher.description }}</div>
        <div v-if="teacher.email">
          <b>Email:</b> {{ teacher.email }}
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image'
import Chip from 'primevue/chip';
import {defineProps, PropType, ref} from 'vue'
import {ProfileResponse} from "@/service/dtoInterfaces";
import serverApi from '@/service/server'
import defaultUserIcon from '@/assets/user_icon.jpg'
import {calculateAge} from "@/service/utils";

const props = defineProps({
  teacher: {
    type: Object as PropType<ProfileResponse>,
    required: true
  }
})

const photo = ref('')
if (props.teacher?.photoId)
  serverApi.getFile(props.teacher?.photoId).then(resp => photo.value = resp.message)
</script>

<style scoped lang="scss">
.card {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  margin: 0 10px;
  text-align: left;

  .info {
    width: 60%;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    font-size: 14pt;

    & > * {
      margin: 10px 0;
    }

    h3 {
      font-size: 20pt;
    }

    .subjects > * {
      margin: 5px;
    }
  }
}
</style>