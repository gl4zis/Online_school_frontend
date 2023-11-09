import {useAlertStore} from "@/stores/AlertStore";

export type User = {
    username: string,
    password: string
}

export function validateUser(user: User): boolean {
    const passwordPattern = /^\S{6,50}$/
    const usernamePattern = /^[\w\d]{3,20}$/
    const emailPattern = /^[\w\d]+@[\w\d]+\.[\w\d]{2,5}$/
    const res: boolean = passwordPattern.test(user.password) &&
        (usernamePattern.test(user.username) || emailPattern.test(user.username))

    if (!res) {
        const alertStore = useAlertStore()
        alertStore.setAlert({
            type: 'error',
            header: 'Failed',
            message: 'Incorrect username or password'
        })
    }

    return res
}