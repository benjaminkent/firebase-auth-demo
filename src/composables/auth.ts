import { ref, reactive } from '@vue/composition-api'
import { User } from 'firebase'

export function useAuth() {
  // because i don't want to list
  // all 31 keys for user
  // eslint-disable-next-line
  let user: any = reactive({})
  // eslint-disable-next-line
  let userToken: any = reactive({})
  const isLoggedIn = ref(false)

  function setUser(userObj: User | null) {
    user = userObj
  }

  // eslint-disable-next-line
  function setUserToken(token: any) {
    userToken = token
  }

  function setLoggedInStatus(status: boolean) {
    isLoggedIn.value = status
  }

  return {
    user,
    userToken,
    isLoggedIn,
    setUser,
    setUserToken,
    setLoggedInStatus,
  }
}
