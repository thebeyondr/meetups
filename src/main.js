import Vue from 'vue'
import firebase from 'firebase/app'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Alert'
import dotenv from 'dotenv'
import MeetupRegisterDialog from './components/RegisterMeetupDialog'
import MeetupEditDialog from './components/EditMeetupDialog'
import MeetupEditDateDialog from './components/EditMeetupDateDialog'
import MeetupEditTimeDialog from './components/EditMeetupTimeDialog'
dotenv.config()

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-register-meetup-dialog', MeetupRegisterDialog)
Vue.component('app-edit-meetup-dialog', MeetupEditDialog)
Vue.component('app-edit-meetup-date-dialog', MeetupEditDateDialog)
Vue.component('app-edit-meetup-time-dialog', MeetupEditTimeDialog)
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: `${process.env.VUE_APP_FB_API}`,
      authDomain: `${process.env.VUE_APP_FB_AUTH_DOMAIN}`,
      databaseURL: `${process.env.VUE_APP_FB_DB}`,
      projectId: `${process.env.VUE_APP_FB_PROJECT_ID}`,
      storageBucket: `${process.env.VUE_APP_FB_STORAGE_BUCKET}`
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
