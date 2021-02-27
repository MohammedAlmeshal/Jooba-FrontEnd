var prodLink;
if (process.env.VERCEL_ENV === 'production') {
    console.log('hereeeeeee')
    prodLink='https://jooba.herokuapp.com'
  } else{
    prodLink = '' 
  }
  export default prodLink