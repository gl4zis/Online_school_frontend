<template>
  <Dialog v-model:visible="showing" modal>
    <template #header>
      <h2 class="m-auto">{{ course.name }}</h2>
    </template>
    <div class="body">
      <Image :src="image" @error="image = defaultCourseImage" width="400"/>
      <div class="description">
        <Chip :label="course?.subject"/>
        <p>{{ course.summary }}</p>
        <p>{{ course.description }}</p>
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
      <div class="lessons" v-if="course.lessonIds.length">
        TODO lessons representation!
      </div>
      <div style="width: 100%; text-align: center" v-else>
        <h3>There are no information about this course lessons right now</h3>
      </div>
      <span v-if="course.studentIds.length">
        {{ course.studentIds.length }}
        <template v-if="course.studentIds.length == 1">student</template>
        <template v-else>students</template>
        have already signed up!
      </span>
      <Button v-if="canBuy"
              :label="'BUY only for ' + course.price + ' rubles'"
              severity="success"
              @click="buy"
              :disabled="profileStore.profile?.role !== 'STUDENT'"/>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import {defineExpose, defineProps, PropType, Ref, ref} from 'vue'
import {Course, Profile} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import defaultCourseImage from "@/assets/course_image.jpg"
import defaultUserImage from "@/assets/user_icon.jpg"
import Chip from "primevue/chip";
import Image from "primevue/image";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import {profileStore} from "@/stores/profileStore";
import {mainStore} from "@/stores/mainStore";

const props = defineProps({
  course: {
    type: Object as PropType<Course>,
    required: true
  },
  canBuy: {
    type: Boolean,
    default: true
  }
})

defineExpose({
  show
})

const showing = ref(false)

const image: Ref<any> = ref(serverApi.getLinkOnImage(props.course.imageId))
const teacher: Ref<Profile | undefined> = ref(mainStore.findTeacherById(props.course?.teacherId))
const teacherPhoto: Ref<any> = ref()

function buy(): void {
  return
}

function show(): void {
  showing.value = true
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