import { store } from './store'
export default (to, from, next) => {
  if (store.getters.loadUser) {
    next()
  } else {
    next('/signin')
  }
}
