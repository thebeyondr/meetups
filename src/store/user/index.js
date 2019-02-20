import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id === payload.id),
        1
      )
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const currentUser = getters.loadUser
      firebase
        .database()
        .ref(`/users/${currentUser.id}`)
        .child('/registrations/')
        .push(payload)
        .then(data => {
          commit('registerUserForMeetup', { id: payload, fbKey: data.key })
          commit('setLoading', false)
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const currentUser = getters.loadUser
      if (!currentUser.fbKeys) {
        commit('setLoading', false)
        return
      }
      const fbKey = currentUser.fbKeys[payload]
      firebase
        .database()
        .ref(`/users/${currentUser.id}/registrations/`)
        .child(fbKey)
        .remove()
        .then(() => {
          commit('unregisterUserFromMeetup', payload)
          commit('setLoading', false)
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
          commit('setLoading', false)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} })
    },
    fetchUserData ({ commit, getters }) {
      commit('setLoading', true)
      firebase
        .database()
        .ref(`/users/${getters.loadUser.id}/registrations/`)
        .once('value')
        .then(data => {
          const registrations = data.val()
          let registeredMeetups = []
          let swappedRegistrations = {}
          for (let meetup in registrations) {
            registeredMeetups.push(registrations[meetup])
            swappedRegistrations[registrations[meetup]] = meetup
          }
          const updatedUser = {
            id: getters.loadUser.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedRegistrations
          }
          commit('setUser', updatedUser)
          commit('setLoading', false)
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
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
            registeredMeetups: [],
            fbKeys: {}
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
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', loggedUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          // eslint-disable-next-line
          console.log(err)
        })
    }
  },
  getters: {
    loadUser (state) {
      return state.user
    }
  }
}

/*
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
*/
