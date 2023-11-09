import {defineStore, StoreDefinition} from "pinia";
import {ref, Ref} from "vue";

export const useAppStore: StoreDefinition = defineStore('appStore', () => {
    const loading: Ref<boolean> = ref(false)

    return {
        loading
    }
})