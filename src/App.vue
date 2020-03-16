<template>
  <div id="app">
    <app-header v-if="this.$route.name === 'main'" />
    <div v-if="loading" class="loading">
      <h1>Loading...</h1>
    </div>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthStore from '@/store/authStore'
import AppHeader from '@/components/AppHeader.vue'

// auth
import firebase from 'firebase'
import { firebaseConfig } from '@/config/firebase'

@Component({
  components: {
    AppHeader,
  },
})
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

.loading {
  color: #eee;
  display: flex;
  justify-content: center;
}
</style>
