import {useUserStore} from "@/stores/UserStore";
import alertApi from "@/modules/alert"
import serverApi from "@/modules/server"

export type User = {
    username: string,
    password: string
}

export type StudentReg = {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    grade: number
}

function validPassword(password: string): boolean {
    return /^\S{6,50}$/.test(password)
}

function validUsername(username: string): boolean {
    return /^[\w\d]{3,20}$/.test(username)
}

function validEmail(email: string): boolean {
    return /^[\w\d]+@[\w\d]+\.[\w\d]{2,5}$/.test(email)
}

function validateUser({username, password}: User): boolean {
    return validPassword(password) &&
        (validUsername(username) || validEmail(username))
}

async function signIn(user: User, needRemember: boolean): Promise<boolean> {
    const userStore = useUserStore()
    userStore.resetUser()

    if (!validateUser(user)) {
        alertApi.error('Failed', 'Invalid inputted data')
        return false
    }

    const token: string | null = await serverApi.generateToken(user)

    if (!token) {
        return false
    }

    userStore.setToken(token)
    userStore.setUser(user)
    if (needRemember)
        userStore.saveUser()

    return true
}


export default {
    signIn
}