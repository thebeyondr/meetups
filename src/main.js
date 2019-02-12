import Vue from 'vue'
import firebase from 'firebase/app'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Alert'
import dotenv from 'dotenv'
dotenv.config()

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_FB_API,
      authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FB_DB,
      projectId: process.env.VUE_APP_FB_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET
    })
  }
}).$mount('#app')
