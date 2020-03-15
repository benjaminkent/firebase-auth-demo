<template>
  <div class="main">
    <button @click="goToAuth">Click here to authenticate yoself</button>
    <auth />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Main extends Vue {
  goToAuth() {
    this.$router.push({ name: 'auth' })
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  button {
    width: 350px;
    font-size: 32px;
    background-color: transparent;
    color: #e2ef70;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  button:hover {
    background-color: #444;
  }
}
</style>
