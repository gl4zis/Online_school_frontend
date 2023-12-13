import {Credentials} from "@/modules/server";

const USERNAME_REGEX = /^\w{3,20}$/
const PASSWORD_REGEX = /^\S{6,50}$/
const NAME_REGEX = /^[\s\wа-яА-Я,.\-']{2,50}$/

export function isCredentialsValid(credentials: Credentials): boolean {
    return USERNAME_REGEX.test(credentials.username) && PASSWORD_REGEX.test(credentials.password)
}

export function usernameValidMessage(username: string): string {
    if (!username)
        return "Shouldn't be empty"
    if (username.length < 3 || username.length > 20)
        return 'Length should be between 3 and 20'
    if (!USERNAME_REGEX.test(username))
        return 'Allows only 0-9, A-z, _'
    return ''
}

export function passwordValidMessage(password: string): string {
    if (!password)
        return "Shouldn't be empty"
    if (password.length < 6 || password.length > 50)
        return 'Length should be between 6 and 50'
    if (!PASSWORD_REGEX.test(password))
        return "Whitespace aren't allowed"
    return ''
}

export function nameValidMessage(name: string): string {
    if (!name)
        return "Shouldn't be empty"
    if (name.length < 2 || name.length > 50)
        return 'Length should be between 2 and 50'
    if (!NAME_REGEX.test(name))
        return "It doesn't look like a name"
    return ''
}