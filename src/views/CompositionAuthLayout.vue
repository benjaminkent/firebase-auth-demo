<template>
  <div v-if="!showLoading" class="auth-layout">
    <app-header
      :title="'Composition API Auth'"
      :auth-status="showLoggedInStatus"
    />
    <h2>{{ showLoggedInStatus ? 'Logged In' : 'Logged Out' }}</h2>
    <composition-auth />
    <router-link to="/" class="link">Go Home</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import CompositionAuth from '@/components/CompositionAuth.vue'
import { useAuth } from '@/composables/auth'

export default Vue.extend({
  components: { CompositionAuth, AppHeader },
  setup() {
    const {
      showLoading,
      showLoggedInStatus,
      showUser,
      showUserToken,
    } = useAuth()

    return {
      showLoading,
      showLoggedInStatus,
      showUser,
      showUserToken,
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
