import {defineStore, StoreDefinition} from "pinia";
import {reactive} from "vue";

export type User = {
    username: string,
    password: string,
    jwt: string
}

export const useAppStore: StoreDefinition = defineStore('appStore', () => {
    function setSavedUser(): void {
        const username: string|null = localStorage.getItem('username')
        const password: string|null = localStorage.getItem('password')
        console.log("trying to set user")
        if (username && password) {
            user.username = username
            user.password = password
        }
    }

    const user: User = reactive({
        username: '',
        password: '',
        jwt: ''
    })

    return { user, setSavedUser }
})