<template>
  <Dialog :visible="true" modal :closable="false">
    <template #header>
      <div class="head">
        <Avatar :image="photo || defaultUserImage" size="xlarge" shape="circle"/>
        <Button icon="pi pi-times"
                severity="danger"
                text
                rounded
                @click="back"/>
      </div>
    </template>
    <div class="body">
      <h2>{{ profile?.firstname }} {{ profile?.middleName }} {{ profile?.lastname }}</h2>
      <h3>
        <template v-if="profile?.birthdate">{{ calculateAge(new Date(profile?.birthdate)) }} years,</template>
        {{ profile?.role.toLowerCase() }}
      </h3>
      <div v-if="profile?.email">Email: <b>{{ profile?.email }}</b></div>
      <div class="teacher" v-if="profile?.role === 'TEACHER'">
        <div>{{ profile?.description }}</div>
        <div class="subjects" v-if="profile.subjects?.length">
          <h4>My Subjects</h4>
          <Chip v-for="(subject, idx) in profile.subjects" :key="idx" :label="subject"/>
        </div>
      </div>
      <template v-if="courses?.length">
        <h4>My Courses</h4>
        <Carousel :value="courses"
                  :num-visible="1">
          <template #item="{data}">
            <CourseCard :course="data"/>
          </template>
        </Carousel>
      </template>
    </div>
    <template #footer>
      <div class="foot">
        <Button label="Back" icon="pi pi-arrow-left" @click="back"/>
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
import {defineProps, ref, Ref} from "vue";
import {ProfileResponse} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import {calculateAge} from "@/service/utils";
import CourseCard from "@/components/CourseCard.vue";
import router from "@/router";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const profile: Ref<ProfileResponse | undefined> = ref()
const photo = ref()
const courses = ref()
serverApi.getAnotherProfile(Number(props.id)).then(user => {
  profile.value = user
  photo.value = serverApi.getLinkOnImage(profile.value?.photoId)

  if (profile.value?.role === 'STUDENT' || profile.value?.role === 'TEACHER')
    serverApi.getUserCourses(profile.value).then(resp => courses.value = resp)
})

function back(): void {
  router.back()
}
</script>

<style scoped lang="scss">
.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 450px;

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