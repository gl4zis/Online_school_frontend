<template>
  <div class="main">
    <div class="course-list">
      <CourseSmallCard v-for="course in courses" :key="course.id" :course="course"/>
    </div>
    <div class="side-panel">
      <div class="func">
        <Button label="New Course"
                icon="pi pi-plus"
                severity="success"
                @click="router.push('users/sign-up')"/>
        <Divider/>
        <!-- Filter -->
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

const courses: Ref<Course[] | undefined> = ref()
serverApi.getAllCourses().then(resp => courses.value = resp)
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