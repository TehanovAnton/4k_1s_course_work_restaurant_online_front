const setAuthTokens = (headers) => {
  if (headers['access-token'] !== '') {
    sessionStorage.setItem('access-token', headers['access-token'])
    sessionStorage.setItem('client', headers['client'])
    sessionStorage.setItem('uid', headers['uid'])
    sessionStorage.setItem('expiry', headers['expiry'])
  }
}

const auth_headers = () => {
  return {
    'access-token': sessionStorage.getItem('access-token'),
    'client': sessionStorage.getItem('client'),
    'uid': sessionStorage.getItem('uid'),
    'expiry': sessionStorage.getItem('expiry')
  }
}

export default { setAuthTokens, auth_headers }