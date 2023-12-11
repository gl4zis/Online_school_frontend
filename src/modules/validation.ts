import {Credentials} from "@/modules/server";

const USERNAME_REGEX = /^\w{3,20}$/
const PASSWORD_REGEX = /^\S{6,50}$/

export function isCredentialsValid(credentials: Credentials): boolean {
    return USERNAME_REGEX.test(credentials.username) && PASSWORD_REGEX.test(credentials.password)
}