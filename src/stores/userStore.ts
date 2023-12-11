import {defineStore, StoreDefinition} from "pinia";
import {computed, Ref} from "vue";
import {TokenResponse} from "@/modules/server"

export const useUserStore: StoreDefinition = defineStore('userStore', () => {
    const refresh: Ref<string | null> = computed((): string | null => localStorage.getItem('refresh'))
    const access: Ref<string | null> = computed((): string | null => localStorage.getItem('access'))

    function setTokens(response: TokenResponse): void {
        localStorage.setItem('refresh', response.refresh)
        localStorage.setItem('access', response.access)
    }

    function resetTokens(): void {
        localStorage.removeItem('refresh')
        localStorage.removeItem('access')
    }

    return {
        refresh,
        access,
        setTokens,
        resetTokens
    }
})