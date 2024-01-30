<template>
  <MainLayout>
    <template #header>
      <MainHeader/>
    </template>
    <template #body>
      <section id="info">
        <h2>Some advertisement information with beautiful images to increase sells</h2>
        <div class="ad">
          <div class="text left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
          <Image :src="adImage1" width="500" image-style="border-radius: 10px"/>
        </div>
        <div class="ad">
          <Image :src="adImage2" width="500" image-style="border-radius: 10px"/>
          <div class="text right">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
        <div class="ad">
          <div class="text left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
          <Image :src="adImage3" width="500" image-style="border-radius: 10px"/>
        </div>
      </section>
      <section id="courses">
        <h2>Our Courses</h2>
        <Carousel :value="mainStore.courses"
                  :num-visible="5"
                  :responsive-options="courseCarOption"
                  circular
                  v-if="mainStore.courses?.length">
          <template #item="{data}">
            <CourseCard :course="data"/>
          </template>
        </Carousel>
        <div v-else>Courses are not available now</div>
      </section>
      <section id="teachers">
        <h2>Our Teachers</h2>
        <Carousel :value="mainStore.teachers"
                  :num-visible="5"
                  :responsive-options="teacherCarOption"
                  circular
                  v-if="mainStore.teachers?.length">
          <template #item="{data}">
            <TeacherCard :teacher="data"/>
          </template>
        </Carousel>
        <div v-else>Teacher list is not available now</div>
      </section>
      <section id="contacts">
        <ContactsBlock/>
      </section>
      <router-view/>
    </template>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import Image from 'primevue/image'
import Carousel from 'primevue/carousel';
import {ref} from "vue";
import TeacherCard from "@/components/TeacherCard.vue";
import adImage1 from '@/assets/ad_image_1.jpg'
import adImage2 from '@/assets/ad_image_2.jpg'
import adImage3 from '@/assets/ad_image_3.jpg'
import CourseCard from "@/components/CourseCard.vue";
import MainHeader from "@/components/MainHeader.vue";
import ContactsBlock from "@/components/ContactsBlock.vue";
import {mainStore} from "@/stores/mainStore";

mainStore.getState()

const teacherCarOption = ref([
  {
    breakpoint: '2499px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '2159px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '1599px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1099px',
    numVisible: 1,
    numScroll: 1
  }
])

const courseCarOption = ref([
  {
    breakpoint: '2159px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1799px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '1439px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1023px',
    numVisible: 1,
    numScroll: 1
  }
])
</script>

<style scoped lang="scss">
section {
  margin: 80px auto;
}

#info {
  .ad {
    width: 70%;
    display: flex;
    margin: 50px auto;
    align-items: center;

    .text {
      width: 60%;
      font-size: 14pt;
    }

    .left {
      margin-right: 20px;
      text-align: left;
    }

    .right {
      margin-left: 20px;
      text-align: right;
    }
  }
}
</style>