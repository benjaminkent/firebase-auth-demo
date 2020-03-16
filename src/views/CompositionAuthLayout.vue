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
import { ref } from '@vue/composition-api'
import AppHeader from '@/components/AppHeader.vue'
import CompositionAuth from '@/components/CompositionAuth.vue'

export default Vue.extend({
  components: { CompositionAuth, AppHeader },
  setup() {
    const authStatus = ref(false)

    return {
      authStatus,
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
