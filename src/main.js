
// 引入common.scss
import '@/styles/common.scss'
// 引入element-plus
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getCategoryAPI } from './apis/testAPI'
import App from './App.vue'
import router from './router'
// 全局指令注册
import { lazyPlugin } from '@/directives'
// 引入全局组件插件
import { componentPlugin } from '@/components'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
getCategoryAPI().then(res=>{
    console.log(res);
})