<template>
  <div class="main">
    <div class="course-list">
      <CourseSmallCard v-for="course in courses"
                       :key="course.id"
                       :course="course"
                       @change="filterCourses(actualFilters)"
                       @remove="getCourses"/>
    </div>
    <div class="side-panel">
      <div class="func">
        <Button label="New Course"
                icon="pi pi-plus"
                severity="success"
                @click="router.push('users/sign-up')"/>
        <Divider/>
        <CourseFilter @filter="filterCourses"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CourseSmallCard from "@/components/CourseSmallCard.vue";
import {Ref, ref} from "vue";
import serverApi from "@/service/server";
import {Course} from "@/service/dtoInterfaces";
import router from "@/router";
import Button from "primevue/button";
import Divider from "primevue/divider";
import CourseFilter, {CourseFilters} from "@/components/CourseFilter.vue";

let allCourses: Course[] | undefined
let actualFilters: CourseFilters
const courses: Ref<Course[] | undefined> = ref()
getCourses()

function getCourses() {
  serverApi.getAllCourses().then(resp => {
    allCourses = resp
    filterCourses(actualFilters)
  })
}

function filterCourses(filters: CourseFilters): void {
  actualFilters = filters
  courses.value = allCourses

  if (!filters)
    return

  if (filters.regex)
    courses.value = courses.value?.filter(course =>
      course.name.toLowerCase().includes(filters.regex.toLowerCase())
    )

  if (filters.subject)
    courses.value = courses.value?.filter(course => course.subject == filters.subject)

  if (filters.published)
    courses.value = courses.value?.filter(course => course.published)
  else if (filters.published === false)
    courses.value = courses.value?.filter(course => !course.published)
}
</script>

<style scoped lang="scss">
.main {
  position: relative;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .course-list {
    padding-right: 20px;
    margin-right: 50px;
    min-width: 550px;
  }

  .side-panel {
    width: 250px;
    height: 550px;

    .func {
      width: 250px;
      position: fixed;
      background: white;
      border: 1px solid lightgrey;
      border-radius: 5px;
      padding: 10px;
    }
  }
}
</style>