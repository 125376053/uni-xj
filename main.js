import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

import "./static/css/all.css"
Vue.prototype.baseUrl = "http://waterapi.qijiatech.com";
Vue.prototype.busEvent = new Vue();
import store from "./store";
Vue.use(store)
Vue.prototype.$store = store;

//api
import request from "./api/index.js"
Vue.prototype.request = request

const app = new Vue({
    ...App
})
app.$mount()
