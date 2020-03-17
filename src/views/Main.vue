<template>
  <div class="main">
    <button @click="goToAuth('class')">Class style auth</button>
    <button @click="goToAuth('comp')">Composition API auth</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Main extends Vue {
  goToAuth(val: string) {
    switch (val) {
      case 'class':
        this.$router.push({ name: 'classAuth' })
        break
      case 'comp':
        this.$router.push({ name: 'compositionAuth' })
        break
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  button {
    width: 350px;
    padding: 10px;
    margin: 10px 0;
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
