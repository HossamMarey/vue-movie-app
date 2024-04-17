import './assets/styles/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import wind from '@/services/presets/wind'
import { store } from '@/services/store'

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  pt: wind
});
app.use(ConfirmationService);
app.use(ToastService);

app.use(store)

app.mount('#app')
