import {authStore} from "@/stores/authStore";
import {
    Credentials,
    MessageResponse,
    JwtResponse,
    ProfileResponse,
    ProfileUpdateRequest,
    SignUpData,
    Passwords,
    Status,
    FileRequest,
    AdminRegisterData,
    Course
} from "@/service/dtoInterfaces";

const GATEWAY_ADDRESS = 'http://localhost:8765'

async function getDataFromResponse(resp: Response): Promise<object> {
    try {
        const data = await resp.json()
        data.status = resp.status
        return data
    } catch(err) {
        return { status: resp.status }
    }
}

async function sendStandardRequest(route: string, options?: RequestInit): Promise<object> {
    if (!options)
        options = {}
    if (!options.headers)
        options.headers = {}
    Object.assign(options.headers, {'Content-Type': 'application/json'})

    try {
        const resp: Response = await fetch(GATEWAY_ADDRESS + route, options)
        return await getDataFromResponse(resp)
    } catch (err) {
        return {status: 503}
    }
}

async function sendRequestWithToken(route: string, options?: RequestInit): Promise<object> {
    if (!authStore.tokens) {
        return { status: 401 }
    }

    if (Date.now() + 5000 > authStore.tokens.expiredAt) {
        const newTokens: JwtResponse = await updateTokens(authStore.tokens.refresh)
        if (newTokens.status !== 200) {
            return { status: 401 }
        }

        authStore.setTokens(newTokens)
    }

    if (!options)
        options = {}
    if (!options.headers)
        options.headers = {}
    Object.assign(options.headers, {Authorization: 'Bearer ' + authStore.tokens.access})

    return await sendStandardRequest(route, options)
}

// 400 (Validation) 401 (BadCredentials)
async function login(credentials: Credentials): Promise<JwtResponse> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify(credentials)}

    return <JwtResponse>await sendStandardRequest('/user/login', options)
}

// 403 (InvalidToken)
async function updateTokens(refresh: string): Promise<JwtResponse> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify({refresh: refresh})}

    return <JwtResponse>await sendStandardRequest('/user/tokens', options)
}

// 400 (Validation)
async function usernameUnique(username: string): Promise<MessageResponse> {
    return <MessageResponse>await sendStandardRequest('/user/unique?username=' + username)
}

// 400 (Validation)
async function emailUnique(email: string): Promise<MessageResponse> {
    return <MessageResponse>await sendStandardRequest('/user/unique?email=' + email)
}

// 400 (Validation, UsernameIsTaken)
async function regStudentAccount(credentials: SignUpData): Promise<JwtResponse> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify(credentials)}

    return <JwtResponse>await sendStandardRequest('/user/signup', options)
}

// 403 (InvalidToken)
async function deleteSelfAccount(): Promise<MessageResponse> {
    const options: RequestInit = {method: 'DELETE'}

    return <MessageResponse>await sendRequestWithToken('/user', options)
}

// 403 (InvalidToken), 404 (ProfileNotFound)
async function getSelfProfile(): Promise<ProfileResponse> {
    return <ProfileResponse>await sendRequestWithToken('/user/profile')
}

// 400 (Validation), 403 (InvalidToken)
async function updateSelfProfile(profile: ProfileUpdateRequest): Promise<MessageResponse> {
    const options: RequestInit = {method: 'PUT', body: JSON.stringify(profile)}

    return <MessageResponse>await sendRequestWithToken('/user/profile', options)
}

async function getFile(id: number): Promise<MessageResponse> {
    return <MessageResponse>await sendStandardRequest('/file/' + id)
}

async function changePassword(passwords: Passwords): Promise<Status> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify(passwords)}

    return <Status>await sendRequestWithToken('/user/passwords', options)
}

// 400 Invalid File
async function createFile(req: FileRequest): Promise<MessageResponse> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify(req)}

    const resp: MessageResponse = <MessageResponse>await sendRequestWithToken('/file', options)
    if (resp.status === 403)
        return <MessageResponse>await sendStandardRequest('/file', options)

    return resp
}

// 403 No Access
async function removeFile(id: string): Promise<Status> {
    const options: RequestInit = {method: 'DELETE'}
    const resp: Status = <Status>await sendRequestWithToken('/file/' + id, options)
    if (resp.status === 200)
        return resp

    return <Status>await sendStandardRequest('/file', options)
}

// 400 Validation Error, 403 No Access
async function adminRegister(reg: AdminRegisterData): Promise<Status> {
    const options: RequestInit = {method: 'POST', body: JSON.stringify(reg)}

    return <Status>await sendRequestWithToken('/user/admin/signup', options)
}

async function getAllTeachers(): Promise<ProfileResponse[]> {
    return <ProfileResponse[]>await sendStandardRequest('/user/profile/teachers')
}

async function getAllCourses(): Promise<Course[]> {
    return <Course[]>await sendStandardRequest('/course/all')
}

// 400, 404 (Incorrect id)
async function getAnotherProfile(id: number): Promise<ProfileResponse> {
    return <ProfileResponse>await sendStandardRequest('/user/profile/' + id)
}

function getLinkOnImage(id?: string, size?: number): string {
    if (id) {
        if (size)
            return `${GATEWAY_ADDRESS}/file/${id}?size=${size}`
        else
            return `${GATEWAY_ADDRESS}/file/${id}`
    }

    return ''
}

export default {
    login,
    updateTokens,
    usernameUnique,
    emailUnique,
    regStudentAccount,
    deleteSelfAccount,
    getSelfProfile,
    updateSelfProfile,
    getFile,
    changePassword,
    createFile,
    removeFile,
    adminRegister,
    getAllTeachers,
    getAllCourses,
    getAnotherProfile,
    getLinkOnImage
}