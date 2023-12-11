import {ToastServiceMethods} from "primevue/toastservice";
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
        const resp: Response = await fetch(GATEWAY_ADDRESS + '/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })

        if (resp.ok)
            return await resp.json()
        else if (resp.status === 400)
            toast.add({ severity: 'warn', life: 3000, summary: 'Validation error' })
        else if (resp.status === 401)
            toast.add({ severity: 'warn', life: 3000, summary: 'Invalid login or password' })
        else
            toast.add({ severity: 'error', life: 3000, summary: 'NO CONNECTION' })

    } catch (err) {
        toast.add({ severity: 'error', life: 3000, summary: 'NO CONNECTION' })
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

        console.log(resp)

        if (resp.ok)
            return await resp.json()

    } catch (err) {
        toast.add({ severity: 'error', life: 3000, summary: 'NO CONNECTION' })
    }

    return null
}

export default {
    login,
    updateTokens
}