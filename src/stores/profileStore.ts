import {defineStore, StoreDefinition} from "pinia";
import {computed, Ref} from "vue";

interface IUserData {
    username: string,
    email?: string,
    firstname: string,
    lastname: string,
    photoStr?: string
}

export const useProfileStore: StoreDefinition = defineStore('profileStore', () => {
    const profile: Ref<IUserData | null> = computed((): IUserData | null => {
        const profileStr: string | null = localStorage.getItem('profile')
        if (!profileStr)
            return null

        return JSON.parse(profileStr)
    })

    function updateProfile(data: IUserData): void {
        localStorage.setItem('profile', JSON.stringify(data))
    }

    function resetData(): void {
        localStorage.removeItem('profile')
    }

    return {
        profile,
        updateProfile,
        resetData
    }
})