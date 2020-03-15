import Vue from 'vue'
import Vuex from 'vuex'
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { User } from 'firebase'

Vue.use(Vuex)
const store = new Vuex.Store({})

@Module({ namespaced: true, dynamic: true, store: store, name: 'AuthStore' })
class AuthStore extends VuexModule {
  // because i don't want to list
  // all 31 keys for user
  // eslint-disable-next-line
  user: any = {}
  // eslint-disable-next-line
  userToken: any
  isLoggedIn = false

  @Mutation
  setUser(userInfo: User | null) {
    this.user = userInfo
  }

  @Mutation
  // eslint-disable-next-line
  setUserToken(token: any) {
    this.userToken = token
  }
  @Mutation
  setLoggedInStatus(status: boolean) {
    this.isLoggedIn = status
  }
}

export default getModule(AuthStore)
