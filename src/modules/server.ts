import {StudentReg, User} from '@/modules/user'
import alertApi from "@/modules/alert"

const SERVER_HOST = 'http://localhost:3030'

export type TokenResponse = {
    access: string,
    refresh: string
}

async function isUsernameUnique(username: string): Promise<boolean|null> {
    try {
        const res: Response = await fetch(`${SERVER_HOST}/users/unique?username=${username}`)
        return (await res.json()).message == 'true'
    } catch (err) {
        noConnection()
        return null
    }
}

async function login(user: User): Promise<TokenResponse|null> {
    try {
        const res: Response = await fetch(`${SERVER_HOST}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (res.ok) {
            return <TokenResponse> await res.json()
        } else if (res.status === 401) {
            alertApi.error('Failed', 'Incorrect username or password')
            return null
        } else {
            alertApi.error('Strange', res.statusText)
            return null
        }
    } catch (err) {
        noConnection()
        return null
    }
}

async function studentSignUp(student: StudentReg): Promise<TokenResponse|null> {
    try {
        const res: Response = await fetch(`${SERVER_HOST}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (res.ok) {
            return <TokenResponse> await res.json()
        } else {
            alertApi.error('Failed', (await res.json()).reason)
            return null
        }
    } catch (err) {
        noConnection()
        return null
    }
}

async function updateTokens(refresh: string): Promise<TokenResponse|null> {
    try {
        const res: Response = await fetch(`${SERVER_HOST}/tokens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh})
        });

        if (res.ok) {
            return <TokenResponse> await res.json()
        } else {
            alertApi.error('Failed', (await res.json()).reason)
            return null
        }
    } catch (err) {
        noConnection()
        return null
    }
}

function noConnection(): void {
    alertApi.error('No Connection', 'No connection with server')
}

export default {
    login,
    updateTokens,
    studentSignUp,
    isUsernameUnique
}