import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.apiUrl = 'https://kdsa.cn/api/v1.0';  

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
