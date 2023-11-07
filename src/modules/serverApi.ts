import { User } from '@/modules/user'
import {useAlertStore} from "@/stores/AlertStore";
import {useUserStore} from "@/stores/UserStore";

const SERVER_HOST = 'http://localhost:3030'

export async function login(user: User): Promise<void> {
    const userStore = useUserStore()
    try {
        const res: Response = await fetch(`${SERVER_HOST}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (res.ok) {
            userStore.jwt = (await res.json()).token
            userStore.authorized = true
        } else {
            userStore.authorized = false
            badCredentials()
        }
    } catch (err) {
        noConnection()
    }
}

function noConnection(): void {
    const alertStore = useAlertStore()
    alertStore.setAlert({
        type: 'error',
        header: 'Error',
        message: 'No connection with server'
    })
}

function badCredentials(): void {

    const alertStore = useAlertStore()
    alertStore.setAlert({
        type: 'error',
        header: 'Failed',
        message: 'Incorrect username or password'
    })
}