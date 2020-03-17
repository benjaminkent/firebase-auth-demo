<template>
  <header>
    <h3>Composition API Auth</h3>
    <button v-if="showLoggedInStatus" @click="onLogOut">Log Out</button>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { useAuth } from '@/composables/auth'

export default Vue.extend({
  setup() {
    const { showLoggedInStatus, onLogOut } = useAuth()
    return {
      showLoggedInStatus,
      onLogOut,
    }
  },
})
</script>

<style lang="scss" scoped>
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
</style>
