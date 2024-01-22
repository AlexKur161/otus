import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/init.js'
export default {
  state () {
    return {
      user: {
        userName: null,
        accesToken: null,
        refreshToken: null
      }
    }
  },
  mutations: {
    setEntranceSend(state, user) {
      state.user = user;
    }
  },
  actions: {
    setEntranceSendAction({commit}, data) {
      signInWithEmailAndPassword(auth, data.email, data.pass)
      .then((userCredential) => {
        console.log('зашел', userCredential);
        const user = {
          userName: userCredential._tokenResponse.displayName,
          accesToken: userCredential._tokenResponse.idToken,
          refreshToken: userCredential._tokenResponse.refreshToken
        }
        commit('setEntranceSend', user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
      })
    },
    setRegistrationSendAction({commit}, data) {
      createUserWithEmailAndPassword(auth, data.email, data.pass)
      .then((credential) => {
        updateProfile(auth.currentUser, {
          displayName: data.name
        }).then(()=> {
          console.log('credential',credential)
          const user = {
            userName: credential.user.displayName,
            accesToken: credential._tokenResponse.idToken,
            refreshToken: credential._tokenResponse.refreshToken
          }
        commit('setEntranceSend', user);
        localStorage.setItem('user', JSON.stringify(user));
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  },

  getters: {
    getUser(state) {
      return state.user;
    }
  }
}