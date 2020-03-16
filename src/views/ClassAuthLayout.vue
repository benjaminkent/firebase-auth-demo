<template>
  <div v-if="!loading" class="auth-layout">
    <app-header :title="'Class Style Auth'" :auth-status="authStatus" />
    <h2>{{ authStatus ? 'Logged In' : 'Logged Out' }}</h2>
    <class-auth />
    <router-link to="/" class="link">Go Home</router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ClassAuth from '@/components/ClassAuth.vue'
import AppHeader from '@/components/AppHeader.vue'
import AuthStore from '@/store/authStore'
import firebase from 'firebase'

@Component({
  components: {
    ClassAuth,
    AppHeader,
  },
})
export default class AuthLayout extends Vue {
  loading = false

  async mounted() {
    this.loading = true
    await this.checkAuthState()
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
}
</script>

<style lang="scss" scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: #eee;
  }
  .link {
    color: #e2ef70;
    margin-top: 10px;
  }
}
</style>
