import {defineStore, StoreDefinition} from "pinia";
import {Ref, ref} from "vue";
import {User} from "@/modules/user";

export const useUserStore: StoreDefinition = defineStore('userStore', () => {
    const user: Ref<User> = ref({
        username: '',
        password: ''
    })

    const jwt: Ref<string> = ref('')

    function loadSavedUser(): void {
        const userJson: string|null = localStorage.getItem('user')
        if (userJson)
            user.value = JSON.parse(userJson)
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