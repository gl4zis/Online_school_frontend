import {defineStore, StoreDefinition} from "pinia";
import {Ref, ref} from "vue";

export type AlertType = 'ok' | 'warning' | 'error' | 'message'

export type Alert = {
    type: AlertType,
    header: string,
    message: string
}

export const useAlertStore: StoreDefinition = defineStore('alertStore', () =>{
    const alert: Ref<Alert|null> = ref(null)
    let processIndex: number

    function setAlert(newAlert: Alert): void {
        alert.value = newAlert
        clearTimeout(processIndex)
        processIndex = setTimeout(removeAlert, 5000)
    }

    function removeAlert(): void {
        alert.value = null
    }

    return {
        alert,
        setAlert,
        removeAlert
    }
})