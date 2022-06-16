import { createApp } from 'vue'
import { store, key } from './store'
import router from './router'
import App from './App.vue'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// app.component(ElButton.name, ElButton)

app.use(store, key)
app.use(ElementPlus)
app.use(router)
app.mount('#app')

