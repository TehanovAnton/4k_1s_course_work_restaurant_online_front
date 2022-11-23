import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokens', () => {  

  function setAuthTokens(headers) {    
    if (headers['access-token'] !== '') {
      sessionStorage.setItem('access-token', headers['access-token'])
      sessionStorage.setItem('client', headers['client'])
      sessionStorage.setItem('uid', headers['uid'])
      sessionStorage.setItem('expiry', headers['expiry'])
    }
  }

  const auth_headers = computed(() => {
    return {
      'access-token': sessionStorage.getItem('access-token'),
      'client': sessionStorage.getItem('client'),
      'uid': sessionStorage.getItem('uid'),
      'expiry': sessionStorage.getItem('expiry')
    }
  })

  return { setAuthTokens, auth_headers }
})
