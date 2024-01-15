<template>
  <Dialog v-model:visible="showing" modal @close="back" :closable="false">
    <template #header>
      <div class="head">
        <h2 class="m-auto">{{ course?.name }}</h2>
        <Button icon="pi pi-times"
                severity="danger"
                text
                rounded
                @click="back"/>
      </div>
    </template>
    <div class="body">
      <Image :src="image" @error="image = defaultCourseImage" width="400"/>
      <div class="description">
        <Chip :label="course?.subject"/>
        <p>{{ course?.summary }}</p>
        <p>{{ course?.description }}</p>
        <div class="teacher">
          <span><b>Teacher:</b></span>
          <Avatar :image="teacherPhoto"
                  @error="teacherPhoto = defaultUserImage"
                  size="xlarge"
                  shape="circle"
                  class="m-3"/>
          <span>{{ teacher?.firstname }} {{ teacher?.lastname }}</span>
        </div>
      </div>
      <div class="lessons" v-if="course?.lessonIds.length">
        TODO lessons representation!
      </div>
      <div style="width: 100%; text-align: center" v-else>
        <h3>There are no information about this course lessons right now</h3>
      </div>
      <span v-if="course?.studentIds.length">
        {{ course?.studentIds.length }}
        <template v-if="course.studentIds.length == 1">student</template>
        <template v-else>students</template>
        have already signed up!
      </span>
      <Button :label="'BUY only for ' + course?.price + ' rubles'"
              severity="success"
              @click="buy"
              :disabled="profileStore.profile?.role !== 'STUDENT'"/>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import {defineProps, Ref, ref} from 'vue'
import {Course, ProfileResponse} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import defaultCourseImage from "@/assets/course_image.jpg"
import defaultUserImage from "@/assets/user_icon.jpg"
import Chip from "primevue/chip";
import Image from "primevue/image";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import router from "@/router";
import {profileStore} from "@/stores/profileStore";

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const showing = ref(true)

const course: Ref<Course | undefined> = ref()
const image: Ref<any> = ref()
const teacher: Ref<ProfileResponse | undefined> = ref()
const teacherPhoto: Ref<any> = ref()
serverApi.getCourseById(Number(props.id)).then(resp => {
  course.value = resp
  image.value = serverApi.getLinkOnImage(course.value?.imageId)

  serverApi.getAnotherProfile(course.value?.teacherId).then(profile => {
    teacher.value = profile
    teacherPhoto.value = serverApi.getLinkOnImage(teacher.value?.photoId)
  })
})

function buy(): void {
  return
}

function back(): void {
  showing.value = false
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
  width: 800px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  .description {
    width: 40%;
  }

  .teacher {
    display: flex;
    align-items: center;
  }
}
</style>