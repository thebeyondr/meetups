import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import AuthGuard from './auth-guard'
// Lazy loading components
const Meetups = () => import('./views/Meetups/Meetups')
const Meetup = () => import('./views/Meetups/Meetup')
const CreateMeetup = () => import('./views/Meetups/CreateMeetup')
const Profile = () => import('./views/Users/Profile')
const SignIn = () => import('./views/Users/SignIn')
const SignUp = () => import('./views/Users/SignUp')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'createmeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})
