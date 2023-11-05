import {defineStore, StoreDefinition} from "pinia";
import {Ref, ref} from "vue";
import {User} from "@/modules/user";
import {login} from "@/modules/serverApi";

export const useUserStore: StoreDefinition = defineStore('userStore', () => {
    const user: Ref<User> = ref({
        username: '',
        password: ''
    })

    const jwt: Ref<string> = ref('')

    async function loadSavedUser(): Promise<void> {
        const userJson: string|null = localStorage.getItem('user')
        if (userJson)
            user.value = JSON.parse(userJson)

        jwt.value = await login(user.value) ?? ''
    }

    function setUser(newUser: User): void {
        user.value.username = newUser.username
        user.value.password = newUser.password
    }

    function setToken(token: string): void {
        jwt.value = token
    }

    function saveUser(): void {
        localStorage.setItem('user', JSON.stringify(user.value))
    }

    return {
        user,
        jwt,
        loadSavedUser,
        setUser,
        setToken,
        saveUser
    }
})