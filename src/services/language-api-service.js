import config from '../config';
import TokenService from './token-service';


const LanguageApiService = {
  postGuess(guessValue) {  
    fetch(`${config.API_ENDPOINT}/language/guess`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({ "guess": guessValue })
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(e => Promise.reject(e));
          }
          return res.json();
        })
        .then(res => {
          this.context.setGuess(res);
        });
  }
}

export default LanguageApiService;
