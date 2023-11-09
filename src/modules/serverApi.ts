import { User } from '@/modules/user'
import {useAlertStore} from "@/stores/AlertStore";

const SERVER_HOST = 'http://localhost:3030'

export async function generateToken(user: User): Promise<string|null> {
    try {
        const res: Response = await fetch(`${SERVER_HOST}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (res.ok) {
            return (await res.json()).token
        } else {
            badCredentials()
            return null
        }
    } catch (err) {
        noConnection()
        return null
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