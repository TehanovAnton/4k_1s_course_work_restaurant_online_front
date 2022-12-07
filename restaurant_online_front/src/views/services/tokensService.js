const authHeaders = ['access-token', 'client', 'uid', 'expiry']

const setAuthTokens = (headers) => {
  authHeaders.forEach(headerName => {
    setHeader(headers[headerName], headerName)
  })
}

const setHeader = (header, headerName) => {
  if (header != '') {
    sessionStorage.setItem(headerName, header)
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