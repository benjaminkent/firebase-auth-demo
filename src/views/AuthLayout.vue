<template>
  <div class="auth-layout">
    <h2>{{ authStatus ? 'Logged In' : 'Logged Out' }}</h2>
    <auth />
    <router-link to="/" class="link">Go Home</router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Auth from '@/components/Auth.vue'
import AuthStore from '@/store/authStore'

@Component({
  components: {
    Auth,
  },
})
export default class AuthLayout extends Vue {
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
