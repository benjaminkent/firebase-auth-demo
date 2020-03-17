<template>
  <div v-if="!showLoading" class="auth-layout">
    <comp-header />
    <h2>{{ showLoggedInStatus ? 'Logged In' : 'Logged Out' }}</h2>
    <composition-auth />
    <router-link to="/" class="link">Go Home</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CompHeader from '@/components/CompHeader.vue'
import CompositionAuth from '@/components/CompositionAuth.vue'
import { useAuth } from '@/composables/auth'

export default Vue.extend({
  components: { CompositionAuth, CompHeader },
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
