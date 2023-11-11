import {StudentReg, User} from '@/modules/user'
import alertApi from "@/modules/alert"

const SERVER_HOST = 'http://localhost:3030'

async function isUsernameUnique(username: string): Promise<boolean|null> {
    try {
        const res: Response = await fetch(`${SERVER_HOST}/users/unique?username=${username}`)
        return (await res.json()).message == 'true'
    } catch (err) {
        noConnection()
        return null
    }
}

async function generateToken(user: User): Promise<string|null> {
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

async function studentSignUp(student: StudentReg): Promise<string|null> {
    try {
        const res: Response = await fetch(`${SERVER_HOST}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (res.ok) {
            return (await res.json()).token
        } else {
            alertApi.error('ERROR', res.statusText)
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
    generateToken,
    studentSignUp,
    isUsernameUnique
}