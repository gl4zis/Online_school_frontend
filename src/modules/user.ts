import {useUserStore} from "@/stores/UserStore";
import alertApi from "@/modules/alert"
import serverApi, {TokenResponse} from "@/modules/server"
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
                    getTokensFunc: (obj: any) => Promise<TokenResponse|null>): Promise<boolean> {
    const userStore = useUserStore()
    userStore.resetTokens()

    if (!validFunc(instance)) {
        alertApi.warn('Failed', 'Invalid data')
        return false
    }

    const tokens: TokenResponse|null = await getTokensFunc(instance)

    if (!tokens) {
        return false
    }

    userStore.setTokens(tokens)
    if (needRemember)
        userStore.saveRefresh()

    return true
}

async function signIn(user: User, needRemember: boolean): Promise<boolean> {
    return await auth(user, needRemember, validation.isUserValid, serverApi.login)
}

async function signUpStudent(student: StudentReg, needRemember: boolean): Promise<boolean> {
    return await auth(student, needRemember, validation.isStudentValid, serverApi.studentSignUp)
}

async function updateTokens(): Promise<boolean> {
    const userStore = useUserStore()
    const oldRefresh = userStore.refresh
    const tokens: TokenResponse|null = await serverApi.updateTokens(oldRefresh)

    if (!tokens) {
        return false
    }

    userStore.setTokens(tokens)
    return true
}


export default {
    signIn,
    signUpStudent,
    updateTokens
}