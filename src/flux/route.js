const prodLink 
if (process.env.NODE_ENV !== 'production') {
    prodLink='https://jooba.herokuapp.com'
  } else{
    prodLink = '' 
  }
  export default prodLink