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
    photoId?: string
}

export interface Profile extends ProfileUpdateRequest {
    id: number,
    role: ROLE,
    locked: boolean,
    subjects?: SUBJECT[],
    description?: string
}

export interface ProfileResponse extends Profile, Status {}

export interface Passwords {
    oldPassword: string,
    newPassword: string
}

export interface FileRequest {
    data: number[]
}

export interface AdminRegisterData extends SignUpData {
    role: ROLE
}

export interface Course {
    name: string,
    subject: SUBJECT,
    price: number,
    summary: string,
    description: string,
    imageId?: string,
    studentIds: number[],
    teacherId: number
    // plus lessons
}

export const roles: string[] = ['ADMIN', 'TEACHER', 'STUDENT']
export const subjects: string[] = ['Physics', 'Math', 'Informatics',
    'English Language', 'Russian Language', 'Romanian Language',
    'Hebrew Language', 'Priesthood', 'History']

export type ROLE = typeof roles[number]
export type SUBJECT = typeof subjects[number]