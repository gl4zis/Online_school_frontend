import {defineStore, StoreDefinition} from "pinia";
import {ref, Ref, watch} from "vue";
import {ITokenResponse} from "@/modules/server"

export const useAuthStore: StoreDefinition = defineStore('authStore', () => {
    const access: Ref<string | null> = ref(null)
    const refresh: Ref<string | null> = ref(null)
    const expiredAt: Ref<number | null> = ref(null)

    const savedAccess: string | null = localStorage.getItem('access')
    const savedRefresh: string | null = localStorage.getItem('refresh')
    const savedExpired: string | null = localStorage.getItem('expired')

    access.value = savedAccess
    refresh.value = savedRefresh
    expiredAt.value = Number(savedExpired) || null

    function setTokens(response: ITokenResponse): void {
        access.value = response.access
        refresh.value = response.refresh
        expiredAt.value = response.expiredAt
    }

    function resetTokens(): void {
        access.value = null
        refresh.value = null
        expiredAt.value = null
    }

    watch(() => access.value,
        (state: string | null): void => {
        if (state)
            localStorage.setItem('access', state)
        else localStorage.removeItem('access')
    })

    watch(() => refresh.value,
        (state: string | null): void => {
        if (state)
            localStorage.setItem('refresh', state)
        else localStorage.removeItem('refresh')
    })

    watch(() => expiredAt.value,
        (state: number | null): void => {
        if (state)
            localStorage.setItem('expired_at', String(state))
        else localStorage.removeItem('expired_at')
    })


    return {
        refresh,
        access,
        expiredAt,
        setTokens,
        resetTokens
    }
})