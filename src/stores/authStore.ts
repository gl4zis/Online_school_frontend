import {defineStore, StoreDefinition} from "pinia";
import {computed, Ref} from "vue";
import {ITokenResponse} from "@/modules/server"

export const useAuthStore: StoreDefinition = defineStore('authStore', () => {
    const access: Ref<string | null> = computed((): string | null => localStorage.getItem('access'))
    const refresh: Ref<string | null> = computed((): string | null => localStorage.getItem('refresh'))
    const expiredAt: Ref<string | null> = computed((): string | null => {
        console.log(localStorage.getItem('expired_at'))
        return localStorage.getItem('expired_at')
    })

    function setTokens(response: ITokenResponse): void {
        localStorage.setItem('access', response.access)
        localStorage.setItem('refresh', response.refresh)
        localStorage.setItem('expired_at', String(response.expiredAt))
    }

    function resetTokens(): void {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('expired_at')
    }

    return {
        refresh,
        access,
        expiredAt,
        setTokens,
        resetTokens
    }
})