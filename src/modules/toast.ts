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

export default {
    noConnection,
    validationError,
    invalidCredentials
}