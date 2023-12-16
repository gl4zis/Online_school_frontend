import {defineStore, StoreDefinition} from "pinia";
import {computed, Ref} from "vue";
import {ITokenResponse} from "@/modules/server"

export const useAuthStore: StoreDefinition = defineStore('authStore', () => {
    const access: Ref<string | null> = computed((): string | null => localStorage.getItem('access'))
    const refresh: Ref<string | null> = computed((): string | null => localStorage.getItem('refresh'))
    const expiredAt: Ref<number | null> = computed((): number | null => {
        const expiredStr: string | null = localStorage.getItem('expired_at')
        if (expiredStr)
            return JSON.parse(expiredStr)
        return null
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