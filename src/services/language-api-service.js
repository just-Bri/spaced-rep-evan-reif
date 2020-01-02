import config from '../config';
import TokenService from './token-service';


const LanguageApiService = {
  // postGuess(guessValue) {  
  postGuess(guess) {  
    return fetch(`${config.API_ENDPOINT}/language/guess`, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        // body: JSON.stringify(guessValue)
        body: JSON.stringify({"guess": guess})
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(e => Promise.reject(e))
          } else {
            return res.json()
          }
      })
  },
  getHead(){
    return fetch(`${config.API_ENDPOINT}/language/head`, {
    method: "GET",
    headers: {
      'authorization': `Bearer ${TokenService.getAuthToken()}`
    }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      // console.log(res)
      return res.json();
    })
  }
}

export default LanguageApiService;
