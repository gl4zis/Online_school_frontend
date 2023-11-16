import {defineStore, StoreDefinition} from "pinia";
import {computed, Ref} from "vue";
import serverApi, {TokenResponse} from "@/modules/server"
import router from "@/router";

export const useUserStore: StoreDefinition = defineStore('userStore', () => {
    const refresh: Ref<string|null> = computed((): string|null => sessionStorage.getItem('refresh'))
    const access: Ref<string|null> = computed((): string|null => sessionStorage.getItem('access'))

    // TODO don't update tokens each page refresh
    async function loadRefresh(): Promise<void> {
        const token: string|null = localStorage.getItem('refresh')
        if (token) {
            const tokens: TokenResponse|null = await serverApi.updateTokens(token)
            if (tokens) {
                setTokens(tokens)
                saveRefresh()
            } else {
                resetTokens()
                await router.push("/login")
            }
        }
    }

    function saveRefresh(): void {
        if (refresh.value)
            localStorage.setItem('refresh', refresh.value)
    }

    function setTokens(response: TokenResponse): void {
        sessionStorage.setItem('refresh', response.refresh)
        sessionStorage.setItem('access', response.access)
    }

    function resetTokens(): void {
        localStorage.removeItem('refresh')
        sessionStorage.removeItem('refresh')
        sessionStorage.removeItem('access')
    }

    return {
        refresh,
        access,
        loadRefresh,
        saveRefresh,
        setTokens,
        resetTokens
    }
})