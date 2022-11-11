import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokens', () => {
  const auth_tokens = ref({
    access_token: '',
    client: '',
    uid: '',
    expiry: ''
  })

  function setAuthTokens(headers) {
    debugger
    auth_tokens.value.access_token = headers['access-token']
    auth_tokens.value.client = headers.client
    auth_tokens.value.uid = headers.uid
    auth_tokens.value.expiry = headers.expiry
  }

  const auth_headers = computed(() => {
    return {
      'access-token': auth_tokens.value.access_token,
      'client': auth_tokens.value.client,
      'uid': auth_tokens.value.uid,
      'expiry': auth_tokens.value.expiry
    }
  })

  return { auth_tokens, setAuthTokens, auth_headers }
})
