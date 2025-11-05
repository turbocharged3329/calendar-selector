import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import ru from './lang/ru.json'
import en from './lang/en.json'
import { LOCALE_LS_KEY } from '@/constants/index.js'

const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem(LOCALE_LS_KEY) || 'ru',
  fallbackLocale: 'en',
  messages: {
    ru,
    en,
  },
})

app.use(i18n)
app.mount('#app')
