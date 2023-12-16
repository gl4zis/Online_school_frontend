import {useAuthStore} from "@/stores/authStore";

const GATEWAY_ADDRESS = 'http://localhost:8765'

interface IStatus {
    status: number
}

export interface ITokenResponse extends IStatus {
    access: string,
    refresh: string,
    expiredAt: number
}

export interface ICredentials {
    username: string,
    password: string
}

export interface IProfile extends IStatus {
    firstname: string,
    lastname: string,
    middleName?: string,
    birthdate?: Date,
    photoId?: number,
    subjects?: Array<string>,
    description?: string
}

export interface IAccountData extends IStatus {
    id: number,
    username: string,
    email?: string,
    roles: Array<string>,
    locked: boolean
}

export interface IMessageResponse extends IStatus {
    message: string
}

async function createDataFromResponse(resp: Response): Promise<object> {
    try {
        const data = await resp.json()
        data.status = resp.status
        return data
    } catch(err) {
        return { status: resp.status }
    }
}

async function sendStandardRequest(route: string, options: RequestInit): Promise<object> {
    if (!options.headers)
        options.headers = {}
    Object.assign(options.headers, {'Content-Type': 'application/json'})

    try {
        const resp: Response = await fetch(GATEWAY_ADDRESS + route, options)
        return await createDataFromResponse(resp)
    } catch (err) {
        return {status: 503}
    }
}

async function sendRequestWithToken(route: string, options: RequestInit): Promise<object> {
    const authStore = useAuthStore()

    if (!authStore.expiredAt) {
        return { status: 401 }
    }

    if (Date.now() + 5000 > authStore.expiredAt) {
        const newTokens: ITokenResponse = await updateTokens(authStore.refresh)
        if (newTokens.status !== 200) {
            return { status: 401 }
        }

        authStore.setTokens(newTokens)
    }

    if (!options.headers)
        options.headers = {}
    Object.assign(options.headers, {Authorization: 'Bearer ' + authStore.access})

    return await sendStandardRequest(route, options)
}

// 400 (Validation) 401 (BadCredentials)
async function login(credentials: ICredentials): Promise<ITokenResponse> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify(credentials)}

    return <ITokenResponse>await sendStandardRequest('/auth/login', options)
}

// 403 (InvalidToken)
async function updateTokens(refresh: string): Promise<ITokenResponse> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify({refresh: refresh})}

    return <ITokenResponse>await sendStandardRequest('/auth/tokens', options)
}

// 400 (Validation)
async function usernameUnique(username: string): Promise<IMessageResponse> {
    return <IMessageResponse>await sendStandardRequest('/auth/unique/' + username, {})
}

// 400 (Validation, UsernameIsTaken)
async function regStudentAccount(credentials: ICredentials): Promise<ITokenResponse> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify(credentials)}

    return <ITokenResponse>await sendStandardRequest('/auth/signup', options)
}

// 403 (InvalidToken)
async function deleteSelfAccount(): Promise<IMessageResponse> {
    const options: RequestInit = {method: 'DELETE'}

    return <IMessageResponse>await sendRequestWithToken('/auth', options)
}

// 403 (InvalidToken), 404 (AccountNotFound)
async function getSelfAccount(): Promise<IAccountData> {
    return <IAccountData>await sendRequestWithToken('/auth', {})
}

// 403 (InvalidToken), 404 (ProfileNotFound)
async function getSelfProfile(): Promise<IProfile> {
    return <IProfile>await sendRequestWithToken('/profile', {})
}

// 400 (Validation), 403 (InvalidToken)
async function updateSelfProfile(profile: IProfile): Promise<IMessageResponse> {
    const options: RequestInit = {method: 'PUT', body: JSON.stringify(profile)}

    return <IMessageResponse>await sendRequestWithToken('/profile', options)
}

async function getFile(id: number): Promise<IMessageResponse> {
    return <IMessageResponse>await sendStandardRequest('/file/' + id, {})
}

export default {
    login,
    updateTokens,
    usernameUnique,
    regStudentAccount,
    deleteSelfAccount,
    getSelfAccount,
    getSelfProfile,
    updateSelfProfile,
    getFile
}