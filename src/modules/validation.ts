import {Credentials} from "@/modules/dtoInterfaces";

const USERNAME_REGEX = /^\w{3,20}$/
const PASSWORD_REGEXES = [/^\S+$/, /\d+/, /[a-z]+/, /[A-Z]+/]
const NAME_REGEX = /^[\s\wа-яА-Я,.\-']{2,50}$/
const EMAIL_REGEX = /^\w+@\w+\.\w{2,5}$/

export function isCredentialsValid(credentials: Credentials): boolean {
    return USERNAME_REGEX.test(credentials.username) &&
        PASSWORD_REGEXES.every(regex => regex.test(credentials.password))
}

export function usernameValidMessage(username: string | undefined): string {
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
    if (password.length < 8 || password.length > 50)
        return 'Length should be between 8 and 50'
    if (!PASSWORD_REGEXES[1].test(password))
        return 'Should have at least one digit'
    if (!PASSWORD_REGEXES[2].test(password))
        return 'Should have at least one lowercase'
    if (!PASSWORD_REGEXES[3].test(password))
        return 'Should have at least one uppercase'
    if (!PASSWORD_REGEXES[0].test(password))
        return "Whitespace aren't allowed"
    return ''
}

export function nameValidMessage(name: string | undefined): string {
    if (!name)
        return "Shouldn't be empty"
    if (name.length < 2 || name.length > 50)
        return 'Length should be between 2 and 50'
    if (!NAME_REGEX.test(name))
        return "It doesn't look like a name"
    return ''
}

export function emailValidMessage(email: string | undefined): string {
    if (!email || EMAIL_REGEX.test(email))
        return ''
    else
        return 'Invalid email'
}

export function birthdateValidMessage(birthdate: Date | undefined): string {
    const oneYearMillis = 365 * 24 * 60 * 60 * 1000
    console.log(oneYearMillis)

    if (!birthdate)
        return ''
    if (Date.now() - 6 * oneYearMillis > birthdate.getTime())
        return 'You are too young'
    if (Date.now() - 100 * oneYearMillis < birthdate.getTime())
        return "You're 100 years old?)"
    return ''
}