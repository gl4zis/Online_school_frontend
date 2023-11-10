import {defineStore, StoreDefinition} from "pinia";
import {computed, Ref} from "vue";
import {User} from "@/modules/user";
import serverApi from "@/modules/server"

export const useUserStore: StoreDefinition = defineStore('userStore', () => {
    const user: Ref<User|null> = computed((): User|null => {
        const userJson: string|null = sessionStorage.getItem('user')
        if (userJson)
            return JSON.parse(userJson)
        else
            return null
    })

    const jwt: Ref<string|null> = computed((): string|null => sessionStorage.getItem('jwt'))

    async function loadUser(): Promise<void> {
        const userJson: string|null = localStorage.getItem('user')
        if (userJson) {
            sessionStorage.setItem('user', userJson)
            const token: string | null = await serverApi.generateToken(JSON.parse(userJson))
            if (token)
                sessionStorage.setItem('jwt', token)
        }
    }

    function saveUser(): void {
        localStorage.setItem('user', JSON.stringify(user.value))
    }

    function setUser(user: User): void {
        sessionStorage.setItem('user', JSON.stringify(user))
    }

    function setToken(token: string): void {
        sessionStorage.setItem('jwt', token)
    }

    function resetUser(): void {
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('jwt')
    }

    return {
        user,
        jwt,
        loadUser,
        saveUser,
        resetUser,
        setUser,
        setToken
    }
})