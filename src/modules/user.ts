export type User = {
    username: string,
    password: string
}

export function validate(user: User): boolean {
    const passwordPattern = /^\S{6,50}$/
    const usernamePattern = /^[\w\d]{3,20}$/
    const emailPattern = /^[\w\d]+@[\w\d]+\.[\w\d]{2,5}$/
    return passwordPattern.test(user.password) &&
        (usernamePattern.test(user.username) || emailPattern.test(user.username))
}