import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import firebase, { User } from 'firebase'

export const useAuth = () => {
  // because i don't want to list
  // all 31 keys for user
  // eslint-disable-next-line
  let user: any = reactive({})
  // eslint-disable-next-line
  let userToken: any = reactive({})
  const isLoggedIn = ref(false)
  const loading = ref(false)

  const showLoading = computed(() => loading.value)
  const showLoggedInStatus = computed(() => isLoggedIn.value)
  const showUser = computed(() => user)
  const showUserToken = computed(() => userToken)

  const setAuthToken = async () => {
    const currentUser = await firebase.auth().currentUser
    if (currentUser) {
      currentUser
        .getIdToken(/* forceRefresh */ true)
        .then(token => (userToken = token))
        .catch(error => console.error(error))
    }
  }

  const checkAuthState = async () => {
    loading.value = true
    await firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        isLoggedIn.value = true
        user = await firebase.auth().currentUser
        setAuthToken()
        loading.value = false
      } else {
        isLoggedIn.value = false
        loading.value = false
      }
    })
  }

  onMounted(() => {
    checkAuthState()
  })

  return {
    showLoading,
    showLoggedInStatus,
    showUser,
    showUserToken,
  }
}
