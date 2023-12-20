import {defineStore, StoreDefinition} from "pinia";
import {ref, Ref, watch} from "vue";

interface IUserData {
    username: string,
    email?: string,
    firstname: string,
    lastname: string,
    photoId: number,
    photoStr?: string
}

export const useProfileStore: StoreDefinition = defineStore('profileStore', () => {
    const profile: Ref<IUserData | null> = ref(null)

    const savedProfile: string | null = localStorage.getItem('profile')
    if (savedProfile)
        profile.value = JSON.parse(savedProfile)

    function updateProfile(data: IUserData): void {
        profile.value = data
    }

    function resetData(): void {
        profile.value = null
    }

    watch(() => profile.value,
        (state: IUserData | null): void => {
        if (state)
            localStorage.setItem('profile', JSON.stringify(state))
        else localStorage.removeItem('profile')
    }, {deep: true})

    return {
        profile,
        updateProfile,
        resetData
    }
})