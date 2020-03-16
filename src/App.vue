<template>
  <div id="app">
    <app-header v-if="this.$route.name === 'main'" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
  async created() {
    await this.intializeAuth()
  }

  async intializeAuth() {
    await firebase.initializeApp(firebaseConfig)
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
