import {ToastServiceMethods} from "primevue/toastservice";

function noConnection(toast: ToastServiceMethods): void {
    toast.add({severity: 'error', life: 3000, summary: 'NO CONNECTION'})
}

function validationError(toast: ToastServiceMethods): void {
    toast.add({severity: 'warn', life: 3000, summary: 'Validation error'})
}

function invalidCredentials(toast: ToastServiceMethods): void {
    toast.add({severity: 'warn', life: 3000, summary: 'Invalid username or password'})
}

function registered(toast: ToastServiceMethods, username: string): void {
    toast.add({severity: 'success', life: 3000, summary: 'Success', detail: `User ${username} was registered`})
}

function strangeError(toast: ToastServiceMethods): void {
    toast.add({severity: 'error', life: 3000, summary: 'Something went wrong', detail: 'Try again'})
}

function success(toast: ToastServiceMethods, message: string): void {
    toast.add({severity: 'success', life: 3000, summary: 'Success', detail: message})
}

export default {
    noConnection,
    validationError,
    invalidCredentials,
    registered,
    strangeError,
    success
}