<template>
  <div v-if="!loading" class="auth-layout">
    <app-header :title="'Composition API Auth'" :auth-status="authStatus" />
    <h2>{{ authStatus ? 'Logged In' : 'Logged Out' }}</h2>
    <composition-auth />
    <router-link to="/" class="link">Go Home</router-link>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from '@vue/composition-api'
import AppHeader from '@/components/AppHeader.vue'
import CompositionAuth from '@/components/CompositionAuth.vue'
import { useAuth } from '@/composables/auth'
import firebase from 'firebase'

export default {
  components: { CompositionAuth, AppHeader },
  setup() {
    const loading = ref(false)
    const authStatus = ref(false)

    async function getAuthToken() {
      const currentUser = await firebase.auth().currentUser
      if (currentUser) {
        currentUser
          .getIdToken(/* forceRefresh */ true)
          .then(token => useAuth().setUserToken(token))
          .catch(error => console.error(error))
      }
    }

    async function checkAuthState() {
      await firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          await useAuth().setLoggedInStatus(true)
          await useAuth().setUser(firebase.auth().currentUser)
          await getAuthToken()
        } else {
          useAuth().setLoggedInStatus(false)
          loading.value = false
        }
      })
    }

    onMounted(async () => {
      loading.value = true
      await checkAuthState()
      loading.value = false
    })

    return {
      loading,
      authStatus,
      checkAuthState,
      useAuth,
    }
  },
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
