export interface Status {
    status: number
}

export interface JwtResponse extends Status {
    access: string,
    refresh: string,
    expiredAt: number
}

export interface Credentials {
    username: string,
    password: string
}

export interface SignUpData extends Credentials {
    firstname: string,
    lastname: string
}

export interface MessageResponse extends Status {
    message: string
}

export interface ProfileUpdateRequest {
    username: string,
    email?: string,
    firstname: string,
    lastname: string,
    middleName?: string,
    birthdate?: string,
    photoId?: number
}

export interface Profile extends ProfileUpdateRequest {
    id: number,
    role: ROLE,
    locked: boolean
}

export interface ProfileResponse extends Profile, Status {}

export interface Passwords {
    oldPassword: string,
    newPassword: string
}

export interface FileRequest {
    base64: string,
    name: string,
    contentType: string
}

export type ROLE = 'ADMIN' | 'TEACHER' | 'STUDENT'

export interface AdminRegisterData extends SignUpData {
    role: ROLE
}