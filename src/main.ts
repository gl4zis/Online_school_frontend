import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/md-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css'


createApp(App)
    .use(router)
    .use(createPinia())
    .use(PrimeVue)
    .use(ToastService)
    .mount('#app')
