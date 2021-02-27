var prodLink;
if (process.env.VERCEL_ENV !== 'production') {
    prodLink='https://jooba.herokuapp.com'
  } else{
    prodLink = '' 
  }
  export default prodLink