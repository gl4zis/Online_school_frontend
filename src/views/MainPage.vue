<template>
  <MainLayout>
    <template #body>
      <section id="info">
        <h2>Some advertisement information with beautiful images to increase sells</h2>
      </section>
      <section id="courses">

      </section>
      <section id="teachers">
        <h2>Our Teachers</h2>
        <Carousel :value="teachers"
                  :num-visible="1"
                  circular>
          <template #item="{data}">
            <TeacherCard :teacher="data"/>
          </template>
        </Carousel>
      </section>
      <section id="contacts">

      </section>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import Carousel from 'primevue/carousel';
import {Ref, ref} from "vue";
import serverApi from '@/modules/server'
import TeacherCard from "@/components/TeacherCard.vue";
import {ProfileResponse} from "@/modules/dtoInterfaces";

const teachers: Ref<ProfileResponse[] | undefined> = ref()
serverApi.getAllTeachers().then(data => teachers.value = data)
</script>

<style scoped lang="scss">
#info {
  margin: 20px auto;
  text-align: center;
}

#teachers {
  text-align: center;
}
</style>