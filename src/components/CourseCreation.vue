<template>
  <Dialog :visible="true" modal class="form" :closable="false">
    <template #header>
      <BackButton :callback="removeImageAndQuit"/>
      <h2>New course</h2>
    </template>
      <div class="up-fields">
        <UniqueInput label="Name"
                     param-type="course-name"
                     v-model="name"
                     class="name"
                     ref="nameInput"/>
        <InputNumber :min="0"
                     :max="1E6"
                     v-model="price"
                     placeholder="Price"
                     :input-style="{width: '110px'}"/>
      </div>
      <Image :src="serverApi.getLinkOnImage(imageId) || courseImage" width="400"/>
      <ImageUploader :removable="false" :aspect-ratio="7/5" @update="setPhoto"/>
      <div class="down-fields">
        <Dropdown :options="subjects"
                  placeholder="Subject"
                  filter
                  v-model="subject"
                  :input-style="{width: '150px', 'text-align': 'left'}"/>
        <Dropdown :options="teachers"
                  placeholder="Teacher"
                  filter
                  :option-label="(data) => data.lastname + ' ' + data.firstname"
                  v-model="teacher"
                  :input-style="{width: '150px', 'text-align': 'left'}">
          <template #value="teacher">
            <span v-if="teacher.value">{{ teacher.value.lastname }} {{ teacher.value.firstname }}</span>
            <span v-else>{{ teacher.placeholder }}</span>
          </template>
          <template #option="teacher">
            <div class="flex align-items-center">
                <Avatar :image="serverApi.getLinkOnImage(teacher.option.photoId) || userIcon"
                        size="small"
                        shape="circle"
                        class="mr-2"/>
                {{ teacher.option.lastname }} {{ teacher.option.firstname }}
            </div>
          </template>
        </Dropdown>
      </div>
      <span class="p-float-label">
        <Textarea v-model="summary" rows="2" class="mb-3" style="width: 100%" auto-resize/>
        <label>Summary (Not more 2 sentences)</label>
      </span>
      <span class="p-float-label">
        <Textarea v-model="description" rows="4" style="width: 100%" auto-resize/>
        <label>Description</label>
      </span>
    <template #footer>
      <div class="foot">
        <Button label="Create" severity="success" @click="create"/>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import BackButton from "@/components/BackButton.vue";
import ImageUploader from "@/components/ImageUploader.vue";
import Image from "primevue/image";
import {ref, defineEmits} from "vue";
import courseImage from '@/assets/course_image.jpg'
import {CourseCreateData, FileRequest, subjects} from "@/service/dtoInterfaces";
import UniqueInput from "@/components/UniqueInput.vue";
import Dropdown from "primevue/dropdown";
import serverApi from "@/service/server";
import Avatar from "primevue/avatar";
import userIcon from '@/assets/user_icon.jpg'
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import toastApi from "@/service/toast"
import router from "@/router";
import Textarea from 'primevue/textarea';

const emit = defineEmits(['new'])

const nameInput = ref()

const name = ref()
const price = ref()
const imageId = ref()
const subject = ref()
const teachers = ref()
const summary = ref()
const description = ref()
serverApi.getAllProfiles().then(profiles =>
    teachers.value = profiles.filter(profile => profile.role === 'TEACHER')
)
const teacher = ref()

async function setPhoto(req: FileRequest): Promise<void> {
  if (imageId.value)
    serverApi.removeFile(imageId.value)

  imageId.value = undefined

  const resp = await serverApi.createFile(req)

  if (resp.status === 200)
    imageId.value = resp.message
  else
    toastApi.strangeError("Can't load image")
}

function removeImageAndQuit(): void {
  if (imageId.value)
    serverApi.removeFile(imageId.value)

  router.back()
}

async function create(): Promise<void> {
  if (!name.value || !price.value || !subject.value || !teacher.value ||
      !summary.value || !description.value
  ) {
    toastApi.validationError("You should fill all fields")
    return
  }

  if (!nameInput.value.isValid()) {
    toastApi.validationError("Course name is not unique")
    return
  }

  const request: CourseCreateData = {
    name: name.value,
    price: price.value,
    imageId: imageId.value,
    subject: subject.value,
    summary: summary.value,
    description: description.value,
    teacherId: teacher.value.id
  }

  const resp = await serverApi.createCourse(request)

  if (resp.status !== 200) {
    toastApi.strangeError("Can't create course")
    removeImageAndQuit()
  } else {
    emit('new')
    toastApi.success("Course was created. Id: " + resp.message)
    router.back()
  }
}
</script>

<style scoped lang="scss">
.form {
  padding: 0 15px;
  text-align: center;

  h2 {
    margin: auto;
  }

  .up-fields {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: start;

    .name {
      width: 250px;
    }
  }

  .down-fields {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }

  .foot {
    text-align: center;
  }
}
</style>