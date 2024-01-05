<template>
  <Dialog v-model:visible="showing" modal @close="showing = false">
    <template #header>
      <Avatar :image="photo || defaultUserImage" size="xlarge" shape="circle"/>
    </template>
    <div class="body">
      <h2>{{ profile.firstname }} {{ profile.middleName }} {{ profile.lastname }}</h2>
      <h3>{{ calculateAge(new Date(profile.birthdate)) }} years, {{ profile.role.toLowerCase() }}</h3>
      <div v-if="profile.email">Email: <b>{{ profile.email }}</b></div>
      <div class="teacher" v-if="profile.role === 'TEACHER'">
        <div>{{ profile.description }}</div>
        <div class="subjects">
          <h4>My Subjects</h4>
          <Chip v-for="(subject, idx) in profile.subjects" :key="idx" :label="subject"/>
        </div>
      </div>
      <Carousel :value="courses"
                :num-visible="1">
        <template #item="{data}">
          <CourseCard :course="data" size="small"/>
        </template>
      </Carousel>
    </div>
    <template #footer>
      <div class="foot">
        <Button label="Back" icon="pi pi-arrow-left" @click="showing = false"/>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Carousel from "primevue/carousel";
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import defaultUserImage from "@/assets/user_icon.jpg";
import Avatar from "primevue/avatar";
import Dialog from "primevue/dialog";
import {PropType, defineProps, defineExpose, ref} from "vue";
import {Profile} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import {calculateAge} from "@/service/utils";
import CourseCard from "@/components/CourseCard.vue";

const props = defineProps({
  profile: {
    type: Object as PropType<Profile>,
    required: true
  }
})

defineExpose({
  show
})

const photo = ref(serverApi.getLinkOnImage(props.profile?.photoId, 100))
const showing = ref(false)

const courses = ref()
if (props.profile?.role === 'TEACHER')
  serverApi.getTeacherCourses(props.profile.id).then(resp => courses.value = resp)

function show(): void {
  showing.value = true
}
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 400px;

  h2, h3 {
    margin-bottom: 15px;
    margin-top: 0;
  }

  .teacher {
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .subjects {
      margin: 15px auto;
      text-align: center;

      * {
        margin: 5px;
      }
    }
  }
}

.foot {
  text-align: center;
}
</style>