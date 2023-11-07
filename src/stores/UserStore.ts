import {defineStore, StoreDefinition} from "pinia";
import {Ref, ref} from "vue";
import {User} from "@/modules/user";
import {login} from "@/modules/serverApi";

export const useUserStore: StoreDefinition = defineStore('userStore', () => {
    const user: Ref<User|null> = ref(null)
    const jwt: Ref<string|null> = ref(null)
    const authorized: Ref<boolean> = ref(false)

    async function loadSavedUser(): Promise<void> {
        const userJson: string|null = localStorage.getItem('user')
        if (userJson) {
            user.value = JSON.parse(userJson)
            await login(<User> user.value)
        }
    }

    function saveUser(): void {
        localStorage.setItem('user', JSON.stringify(user.value))
    }

    function resetUserInStorage(): void {
        localStorage.removeItem('user')
    }

    return {
        user,
        jwt,
        authorized,
        loadSavedUser,
        saveUser,
        resetUserInStorage
    }
})