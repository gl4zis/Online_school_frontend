import {defineStore, StoreDefinition} from "pinia";
import {computed, Ref} from "vue";
import {ITokenResponse} from "@/modules/server"

export const useUserStore: StoreDefinition = defineStore('userStore', () => {
    const tokenData: Ref<ITokenResponse | null> = computed((): ITokenResponse | null => {
        const data: string | null = localStorage.getItem('tokenData')
        if (!data)
            return null

        return JSON.parse(data)
    })
    const access: Ref<string | undefined> = computed((): string | undefined => tokenData.value?.access)
    const refresh: Ref<string | undefined> = computed((): string | undefined => tokenData.value?.refresh)
    const expiredAt: Ref<number | undefined> = computed((): number | undefined => tokenData.value?.expiredAt)

    function setTokens(response: ITokenResponse): void {
        localStorage.setItem('tokenData', JSON.stringify(response))
    }

    function resetTokens(): void {
        localStorage.removeItem('tokenData')
    }

    return {
        refresh,
        access,
        expiredAt,
        setTokens,
        resetTokens
    }
})