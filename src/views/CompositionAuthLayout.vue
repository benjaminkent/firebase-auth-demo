<template>
  <div class="auth-layout">
    <app-header :title="'Composition API Auth'" :auth-status="authStatus" />
    <h2>{{ authStatus ? 'Logged In' : 'Logged Out' }}</h2>
    <composition-auth />
    <router-link to="/" class="link">Go Home</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, onMounted, computed } from '@vue/composition-api'
import AppHeader from '@/components/AppHeader.vue'
import CompositionAuth from '@/components/CompositionAuth.vue'
import firebase from 'firebase'

export default Vue.extend({
  components: { CompositionAuth, AppHeader },
  setup() {
    let loading = ref(false)

    const authStatus = computed(() => 'foo')

    function getAuthToken() {
      const currentUser = firebase.auth().currentUser
      if (currentUser) {
        currentUser
          .getIdToken(/* forceRefresh */ true)
          .then(token => console.log(token)) // set token
          .catch(error => console.error(error))
      }
    }

    async function checkAuthState() {
      await firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // set user
          // set logged in status to true
          getAuthToken()
          loading = false
        } else {
          // set logged in status to false
          loading = false
        }
      })
    }

    onMounted(() => {
      loading = true
      checkAuthState()
    })

    return {
      loading,
      authStatus,
      checkAuthState,
    }
  },
})
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
