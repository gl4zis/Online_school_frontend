import {ToastServiceMethods} from "primevue/toastservice";
import {isCredentialsValid} from "@/modules/validation";

const GATEWAY_ADDRESS = 'http://localhost:8765'

export interface TokenResponse {
    access: string,
    refresh: string
}

export interface Credentials {
    username: string,
    password: string
}

async function login(credentials: Credentials, toast: ToastServiceMethods): Promise<TokenResponse | null> {
    try {
        if (!isCredentialsValid(credentials)) {
            validationError(toast)
            return null
        }

        const resp: Response = await fetch(GATEWAY_ADDRESS + '/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })

        if (resp.ok)
            return await resp.json()
        else if (resp.status === 400)
            validationError(toast)
        else if (resp.status === 401)
            toast.add({ severity: 'warn', life: 3000, summary: 'Invalid login or password' })
        else
            noConnection(toast)

    } catch (err) {
        noConnection(toast)
    }

    return null
}

async function updateTokens(refresh: string, toast: ToastServiceMethods): Promise<TokenResponse | null> {
    try {
        const resp: Response = await fetch(GATEWAY_ADDRESS + '/auth/tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'refresh': refresh })
        })

        if (resp.ok)
            return await resp.json()

    } catch (err) {
        noConnection(toast)
    }

    return null
}

function noConnection(toast: ToastServiceMethods): void {
    toast.add({ severity: 'error', life: 3000, summary: 'NO CONNECTION' })
}

function validationError(toast: ToastServiceMethods): void {
    toast.add({ severity: 'warn', life: 3000, summary: 'Validation error' })
}

export default {
    login,
    updateTokens
}