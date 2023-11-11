import {useUserStore} from "@/stores/UserStore";
import alertApi from "@/modules/alert"
import serverApi from "@/modules/server"
import validation from "@/modules/validation";

export type User = {
    username: string,
    password: string
}

export type StudentReg = {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    grade: number
}

async function auth(instance: object, needRemember: boolean,
                    validFunc: (obj: any) => boolean,
                    getTokenFunc: (obj: any) => Promise<string|null>): Promise<boolean> {
    const userStore = useUserStore()
    userStore.resetUser()

    if (!validFunc(instance)) {
        alertApi.warn('Failed', 'Invalid data')
        return false
    }

    const token: string | null = await getTokenFunc(instance)

    if (!token) {
        return false
    }

    userStore.setToken(token)
    userStore.setUser(instance)
    if (needRemember)
        userStore.saveUser()

    return true
}

async function signIn(user: User, needRemember: boolean): Promise<boolean> {
    return await auth(user, needRemember, validation.isUserValid, serverApi.generateToken)
}

async function signUpStudent(student: StudentReg, needRemember: boolean): Promise<boolean> {
    return await auth(student, needRemember, validation.isStudentValid, serverApi.studentSignUp)
}


export default {
    signIn,
    signUpStudent
}