const isSuccessful = (response) => {
  return response && response.status === 200
}

const errorshandler = (error) => {            
  console.log(error);
}

export {
  isSuccessful,
  errorshandler
}
