import {defineStore, StoreDefinition} from "pinia";
import {Ref, ref} from "vue";

export type AlertType = 'ok' | 'warning' | 'error' | 'message'

export type Alert = {
    type: AlertType,
    header: string,
    message: string
}

export const useAlertStore: StoreDefinition = defineStore('alertStore', () =>{
    const curAlert: Ref<Alert|null> = ref(null)
    let deleteIdx = 0

    function setAlert(alert: Alert): void {
        curAlert.value = alert
        if (deleteIdx != 0)
            clearTimeout(deleteIdx)
        deleteIdx = setTimeout(removeAlert, 5000)
    }

    function removeAlert(): void {
        curAlert.value = null
    }

    return {
        curAlert,
        setAlert,
        removeAlert
    }
})