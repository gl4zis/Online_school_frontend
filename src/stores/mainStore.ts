import {Course, Profile} from "@/service/dtoInterfaces";
import serverApi from "@/service/server";
import {reactive} from "vue";

interface MainState {
    teachers: Profile[],
    admins: Profile[],
    courses: Course[],
    getState: () => Promise<void>,
    findTeacherCourses: (teacherId: number) => Course[],
    findTeacherById: (teacherId: number) => Profile | undefined,
    findAdminById: (adminId: number) => Profile | undefined
}

export const mainStore: MainState = reactive({
    teachers: <Profile[]>[],
    admins: <Profile[]>[],
    courses: <Course[]>[],

    async getState(): Promise<void> {
        serverApi.getPublishedCourses().then(result => this.courses = result)
        serverApi.publishedTeacherProfiles().then(result => this.teachers = result)
        serverApi.publishedAdminProfiles().then(result => this.admins = result)
    },

    findTeacherCourses(teacherId: number): Course[] {
        return this.courses.filter(course => course.teacherId === teacherId)
    },

    findTeacherById(teacherId: number): Profile | undefined {
        return this.teachers.find(teacher => teacher.id === teacherId)
    },

    findAdminById(adminId: number): Profile | undefined {
        return this.admins.find(admin => admin.id === adminId)
    }
})