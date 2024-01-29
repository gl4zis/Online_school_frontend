<template>
  <div class="card">
    <div class="info">
      <Image :src="image || defaultCourse"
             @error="image = defaultCourse"
             :image-style="{
               'width': '70px',
               'border-radius': '5px',
               'margin': '0 5px'}"/>
      <b>{{ actualCourse.name }}</b>
    </div>
    <div class="buttons">
      <Button size="small"
              label="Info"
              @click="courseDialog.show()"/>
      <Button size="small"
              label="Remove"
              severity="danger"
              @click="remove"/>
      <Button size="small"
              :icon="actualCourse.published ? 'pi pi-minus' : 'pi pi-plus'"
              :severity="actualCourse.published ? 'warning' : 'success'"
              :title="actualCourse.published ? 'Remove from main page' : 'Add in main page'"
              @click="changePublished"/>
    </div>
  </div>
  <CourseBuyCard :course="course" :can-buy="false" ref="courseDialog"/>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, PropType, Ref, ref} from 'vue'
import {Course} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import defaultCourse from "@/assets/course_image.jpg";
import Image from "primevue/image";
import Button from "primevue/button";
import CourseBuyCard from "@/components/CourseBuyCard.vue";

const emit = defineEmits(['change', 'remove'])

const props = defineProps({
  course: {
    type: Object as PropType<Course>,
    required: true
  }
})

const courseDialog = ref()

const actualCourse: Ref<Course> = ref(props.course)
const image: Ref<any> = ref(serverApi.getLinkOnImage(actualCourse.value.imageId))

function changePublished(): void {
  actualCourse.value.published = !actualCourse.value.published
  serverApi.setCoursePublished(actualCourse.value.id, actualCourse.value.published)
  emit('change')
}

function remove(): void {
  serverApi.removeCourse(actualCourse.value.id).then(() => emit('remove'))
}
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 10px;
  height: 60px;
  width: 450px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    align-items: center;
    width: 50%;
    text-align: left;
  }

  .buttons {
    width: 50%;
    display: flex;
    justify-content: space-evenly;
  }
}
</style>