import { ref, reactive, computed, onMounted } from '@vue/composition-api'
import { UserCredentialDetails } from '@/classes/index'
import firebase from 'firebase'

export const useAuth = () => {
  // because i don't want to list
  // all 31 keys for user
  // eslint-disable-next-line
  let userInfo: any = reactive({
    user: {},
  })
  const userToken = ref('')
  const isLoggedIn = ref(false)
  const loading = ref(false)
  const authMethodPicked = ref('log-in')
  const inputUserDetails = ref(new UserCredentialDetails())
  const errors = ref({ code: '', message: '' })

  const showLoading = computed(() => loading.value)
  const showLoggedInStatus = computed(() => isLoggedIn.value)
  const showUser = computed(() => userInfo)
  const showUserToken = computed(() => userToken)
  const showInputUserDetails = computed(() => inputUserDetails.value)
  const showAuthMethodPicked = computed(() => authMethodPicked)

  const logIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        inputUserDetails.value.email,
        inputUserDetails.value.password
      )
      .catch(error => {
        errors.value = { code: error.code, message: error.message }
      })
  }

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        inputUserDetails.value.email,
        inputUserDetails.value.password
      )
      .catch(error => {
        errors.value = { code: error.code, message: error.message }
      })
  }

  const clearUserDetails = () => {
    inputUserDetails.value = {
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  const onAuthSubmit = () => {
    if (authMethodPicked.value === 'log-in') {
      logIn()
    } else {
      if (
        inputUserDetails.value.password !==
        inputUserDetails.value.passwordConfirmation
      ) {
        console.error('Password does not match')
        return
      }
      signUp()
    }
    clearUserDetails()
  }

  const setAuthToken = async () => {
    const currentUser = await firebase.auth().currentUser
    if (currentUser) {
      currentUser
        .getIdToken(/* forceRefresh */ true)
        .then(token => (userToken.value = token))
        .catch(error => console.error(error))
    }
  }

  const checkAuthState = async () => {
    loading.value = true
    await firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        isLoggedIn.value = true
        userInfo.user = await firebase.auth().currentUser
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
    onAuthSubmit,
    showInputUserDetails,
    showAuthMethodPicked,
  }
}
