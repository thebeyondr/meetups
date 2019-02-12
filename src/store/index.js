import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          'https://fshoq.com/free-photos/p/151/eiffel-tower-in-paris/small/show',
        id: 'dgjhkhljhfhgghjkl',
        title: 'Node Workshop in Paris',
        date: new Date(),
        description: 'Come and hang!',
        location: 'Paris'
      },
      {
        imageUrl:
          'https://www.maxpixel.net/static/photo/2x/Us-Congress-America-Washington-Dc-Government-2533244.jpg',
        id: 'sdfsdfdghfj',
        title: 'Meetup in DC',
        date: new Date(),
        description: 'Oh say can you see',
        location: 'Washington DC'
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/109611/pexels-photo-109611.jpeg?cs=srgb&dl=mandeville-jamaica-109611.jpg',
        id: 'vbcbbvbvfsvf',
        title: 'Meetup In Mandeville',
        date: '2019-05-28',
        description: 'Cool cool hills of mandeville',
        location: 'Mandeville'
      },
      {
        imageUrl:
          'https://cdn12.picryl.com/photo/2016/12/31/frauenkirche-dresden-neumarkt-germany-33b39e-1024.jpg',
        id: 'rtyurtyuitu',
        title: 'Meetup in Germany',
        date: '2019-04-28',
        description: 'Lets get mein bread',
        location: 'Germany'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    addMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    createMeetup ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        imageUrl: payload.imageUrl,
        date: payload.date
      }
      // Push to firebase
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          // eslint-disable-next-line
          console.log(data)
          commit('addMeetup', meetup)
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    createUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit('setLoading', false)
          const { user } = response
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          // eslint-disable-next-line
          console.log(err)
        })
    },
    signInUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          commit('setLoading', false)
          const { user } = response
          const loggedUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', loggedUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          // eslint-disable-next-line
          console.log(err)
        })
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadMeetup (state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    },
    loadFeaturedMeetups (state, getters) {
      return getters.loadMeetups.slice(0, 5)
    },
    loadUser (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
