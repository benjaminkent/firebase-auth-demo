<template>
  <header>
    <h3>{{ title }}</h3>
    <button v-if="authStatus" @click="logOut">Log Out</button>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import firebase from 'firebase'

@Component({})
export default class AppHeader extends Vue {
  @Prop(Boolean) readonly authStatus!: boolean
  @Prop({ default: 'Auth Demo' }) readonly title!: string

  logOut() {
    firebase.auth().signOut()
  }
}
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
