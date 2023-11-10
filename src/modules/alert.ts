import {AlertType, useAlertStore} from "@/stores/AlertStore";

function alert(type: AlertType, header: string, message: string): void {
    const alertStore = useAlertStore()
    alertStore.setAlert({
        type,
        header,
        message
    })
}

function error(header: string, message: string): void {
    alert('error', header, message)
}

function ok(header: string, message: string): void {
    alert('ok', header, message)
}

function message(header: string, message: string): void {
    alert('message', header, message)
}

function warn(header: string, message: string): void {
    alert('warning', header, message)
}


export default {
    ok,
    message,
    warn,
    error
}