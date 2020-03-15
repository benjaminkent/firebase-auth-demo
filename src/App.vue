<template>
  <div id="app">
    <header>
      <h3>Auth Test</h3>
      <button v-if="authStatus" @click="logOut">Log Out</button>
    </header>
    <div v-if="loading" class="loading">
      <h1>Loading...</h1>
    </div>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthStore from '@/store/authStore'

// auth
import firebase from 'firebase'
import { firebaseConfig } from '@/config/firebase'

@Component({})
export default class App extends Vue {
  loading = false

  async created() {
    await this.intializeAuth()
    await this.checkAuthState()
  }

  async intializeAuth() {
    this.loading = true
    await firebase.initializeApp(firebaseConfig)
  }

  async checkAuthState() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        AuthStore.setUser(firebase.auth().currentUser)
        AuthStore.setLoggedInStatus(true)
        this.getAuthToken()
        this.loading = false
      } else {
        AuthStore.setLoggedInStatus(false)
        this.loading = false
      }
    })
  }

  getAuthToken() {
    const currentUser = firebase.auth().currentUser
    if (currentUser) {
      currentUser
        .getIdToken(/* forceRefresh */ true)
        .then(token => AuthStore.setUserToken(token))
        .catch(error => console.error(error))
    }
  }

  get authStatus() {
    return AuthStore.isLoggedIn
  }

  logOut() {
    firebase.auth().signOut()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
body {
  margin: 0;
  background: #333;
}
header {
  background-color: #070707;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  h3 {
    margin: 0 0 0 20px;
    color: #eee;
  }
  button {
    margin-right: 20px;
    padding: 0 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #ccc;
    color: #666;
    cursor: pointer;
  }
  button:hover {
    background-color: #bbb;
  }
}
.loading {
  color: #eee;
  display: flex;
  justify-content: center;
}
</style>
