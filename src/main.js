
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



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
getCategoryAPI().then(res=>{
    console.log(res);
})