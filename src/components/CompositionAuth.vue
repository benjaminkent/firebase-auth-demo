<template>
  <div class="auth-container">
    <form class="pick-method-form">
      <div class="input-group">
        <label for="log-in">Log In</label>
        <input
          type="radio"
          id="log-in"
          v-model="authMethodPicked"
          value="log-in"
          name="auth"
          checked
        />
      </div>
      <div class="input-group">
        <label for="sign-up">Sign Up</label>
        <input
          type="radio"
          id="sign-up"
          v-model="authMethodPicked"
          value="sign-up"
          name="auth"
        />
      </div>
    </form>
    <form @submit.prevent="onAuthSubmit" class="creds-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="userDetails.email"
          placeholder="Email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="userDetails.password"
          placeholder="Password"
        />
      </div>
      <div v-if="authMethodPicked === 'sign-up'" class="form-group">
        <label for="password-confirmation">Confirm</label>
        <input
          id="password-confirmation"
          type="password"
          v-model="userDetails.passwordConfirmation"
          placeholder="Confirm Password"
        />
      </div>
      <button type="submit">
        {{ authMethodPicked === 'log-in' ? 'Log In' : 'Sign Up' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ref, reactive } from '@vue/composition-api'
import { UserCredentialDetails } from '@/classes'
import firebase from 'firebase'

export default Vue.extend({
  setup() {
    const authMethodPicked = ref('log-in')
    const userDetails = reactive(new UserCredentialDetails())
    let errors = reactive({ code: '', message: '' })

    function logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(userDetails.email, userDetails.password)
        .catch(error => {
          errors = {
            code: error.code,
            message: error.message,
          }
        })
    }

    function signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
        .catch(error => {
          errors = {
            code: error.code,
            message: error.message,
          }
        })
    }

    function clearUserDetails() {
      userDetails.email = ''
      userDetails.password = ''
      userDetails.passwordConfirmation = ''
    }

    function onAuthSubmit() {
      if (authMethodPicked.value === 'log-in') {
        logIn()
      } else {
        if (userDetails.password !== userDetails.passwordConfirmation) {
          console.warn('password does not match')
          return
        }
        signUp()
      }

      clearUserDetails()
    }

    return {
      authMethodPicked,
      userDetails,
      errors,
      onAuthSubmit,
    }
  },
})
</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  padding: 100px 50px;
  margin-top: 10px;
  border: 1px solid #bbb;
  border-radius: 8px;
  .pick-method-form {
    display: flex;
    margin-bottom: 25px;
    .input-group {
      display: flex;
      flex-direction: column;
      margin: 0 25px;
      label {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .creds-form {
    .form-group {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      label {
        margin-right: 8px;
      }
      input {
        border: 1px solid #fff;
        padding: 3px;
        border-radius: 5px;
        text-indent: 7px;
      }
    }
  }
  button {
    font-size: 14px;
    padding: 8px 18px;
    border-radius: 15px;
    background-color: #333;
    border: 1px solid #222;
    color: #fff;
    cursor: pointer;
  }
  button:hover {
    background-color: #777;
  }
}
</style>
