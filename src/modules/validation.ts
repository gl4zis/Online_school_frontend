import {StudentReg, User} from "@/modules/user";

const usernamePattern = /^[\w\d]{3,20}/
const passwordPattern = /^\S{6,50}$/
const namePattern = /^[\s\wа-яА-Я,.\-']{2,50}$/
const emailPattern = /^[\w\d]+@[\w\d]+\.[\w\d]{2,5}$/

function isUserValid({username, password}: User): boolean {
    return passwordPattern.test(password) &&
        (usernamePattern.test(username) || emailPattern.test(username))
}

function usernameValidateErrors(username: string): string {
    if (username.length === 0)
        return 'Shouldn\'t be empty'
    if (username.length < 3)
        return 'Should be longer 2 sym'
    if (username.length > 20)
        return 'Should be shorter 21 sym'
    if (!usernamePattern.test(username))
        return 'Only A-z 0-9 _ allowed'
    return ''
}

function passwordValidateErrors(password: string): string {
    if (password.length === 0)
        return 'Shouldn\'t be empty'
    if (password.length < 6)
        return 'Should be longer 5 sym'
    if (password.length > 50)
        return 'Should be shorter 51 sym'
    return ''
}

function nameValidateErrors(name: string): string {
    if (name.length === 0)
        return 'Shouldn\'t be empty'
    if (name.length < 2)
        return 'Should be longer 1 sym'
    if (name.length > 50)
        return 'Should be shorter 51 sym'
    if (!namePattern.test(name))
        return 'Only letters space _ , . - \' allowed'
    return ''
}

// yyyy-mm-dd
function birthdateValidateErrors(dateStr: string): string {
    const now: number = Date.now()
    const oneYearMillis = 365 * 24 * 60 * 60 * 1000

    const date: number = Date.parse(dateStr)

    if (Number.isNaN(date))
        return 'Shouldn\'t be empty'
    if (now - date < 6 * oneYearMillis)
        return 'You are younger 6 years'
    if (now - date > 100 * oneYearMillis)
        return 'You are older 100 years?'
    return ''
}

function isGradeValid(grade: number): boolean {
    return Number.isInteger(grade) && grade >= 1 && grade <= 11
}

function isStudentValid({username, password, firstname, lastname, grade, birthdate}: StudentReg): boolean {
    return !usernameValidateErrors(username) && !passwordValidateErrors(password) &&
        !nameValidateErrors(firstname) && !nameValidateErrors(lastname) &&
        !birthdateValidateErrors(birthdate) && isGradeValid(grade)
}

export default {
    usernameValidateErrors,
    passwordValidateErrors,
    nameValidateErrors,
    birthdateValidateErrors,
    isStudentValid,
    isUserValid
}