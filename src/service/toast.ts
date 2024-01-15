import {app} from "@/main";

function noConnection(): void {
    app.config.globalProperties.$toast
        .add({severity: 'error', life: 3000, summary: 'NO CONNECTION'})
}

function validationError(): void {
    app.config.globalProperties.$toast
        .add({severity: 'warn', life: 3000, summary: 'Validation error'})
}

function invalidCredentials(): void {
    app.config.globalProperties.$toast
        .add({severity: 'warn', life: 3000, summary: 'Invalid username or password'})
}

function registered(username: string): void {
    app.config.globalProperties.$toast
        .add({severity: 'success', life: 3000, summary: 'Success', detail: `User ${username} was registered`})
}

function strangeError(message?: string): void {
    app.config.globalProperties.$toast
        .add({severity: 'error', life: 3000, summary: 'Something went wrong', detail: message || 'Try again'})
}

function success(message: string): void {
    app.config.globalProperties.$toast
        .add({severity: 'success', life: 3000, summary: 'Success', detail: message})
}

function noAccess(): void {
    app.config.globalProperties.$toast
        .add({severity: 'warn', life: 3000, summary: 'You have no access for it'})
}

export default {
    noConnection,
    validationError,
    invalidCredentials,
    registered,
    strangeError,
    success,
    noAccess
}