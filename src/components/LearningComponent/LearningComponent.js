import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';
import './LearningComponent.css';

export default class LearningComponent extends Component {
  state = {
    guess: null,
    guessed: false,
    correct: false,
    response: null,
  }

  static contextType = UserContext

  handleSubmit = e => {
    e.preventDefault();
    let guessValue = document.getElementById('learn-guess-input').value
    console.log(guessValue)
    this.setState({
      guess: guessValue.trim(),
      guessed: true,
      currentWord: this.context.head.nextWord,
    });
    document.getElementById('learn-guess-input').value = '';
    LanguageApiService.postGuess(guessValue)
      .then(res => this.context.setGuess(res))
  }

  handleNextWord = () => {
    this.setState({
      guess: null,
      guessed: false,
      correct: false
    })
  }

  // handleQuestion = () => {
  //   return (
  //     <div className='DisplayScore'>
  //       <h2>Translate the word:</h2>
  //       <span className='next-word-text'>{this.context.head.nextWord}</span>
  //       <form>
  //         <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
  //         <input 
  //           id='learn-guess-input'
  //           type='text'
  //           required
  //         />
  //         <Button type='submit' onClick={e => this.handleSubmit(e)}>
  //           Submit your answer
  //         </Button>
  //       </form>
  //       <p>Your total score is: {this.context.head.totalScore}</p>
  //       <p>You have answered this word correctly {this.context.head.wordCorrectCount} times.</p>
  //       <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount} times.</p>
  //     </div>
  //   )
  // }

  // handleCorrectAnswer = () => {
  //   return (
  //     <div className='DisplayScore'>
  //       <h3>You Are Correct!</h3>
  //       <p>The correct translation for {this.context.head.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
  //       <p>Your total score is: {this.context.guess.totalScore}</p>
  //       <p>You have answered this word correctly {this.context.head.wordCorrectCount + 1} times.</p>
  //       <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount} times.</p>
  //       {/* <Button type='click' onClick={e => this.handleNextWord()}>Next Word</Button> */}
  //     </div>
  //   )

  // }

  // handleIncorrectAnswer = () => {
  //   return (
  //     <div className='DisplayScore'>
  //       <h3>You Are Incorrect!</h3>
  //       <p>The correct translation for {this.context.head.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
  //       <p>Your total score is: {this.context.guess.totalScore}</p>
  //       <p>You have answered this word correctly {this.context.head.wordCorrectCount} times.</p>
  //       <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount + 1} times.</p>
  //       {/* <Button type='click' onClick={e => this.handleNextWord()}>Next Word</Button> */}
  //     </div>
  //   )
  // }

  render() {
    // console.log("context", this.context)
    // console.log("state", this.state)
    if (this.state.guessed === false) {
      return (
        // this.handleQuestion()
        <div>
        <h2>Translate the word:</h2>
        <span className='next-word-text'>{this.context.head.nextWord}</span>
        <form>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input 
            id='learn-guess-input'
            type='text'
            required
          />
          <Button type='submit' onClick={e => this.handleSubmit(e)}>
            Submit your answer
          </Button>
        </form>
        <div className='DisplayScore'>
          <p>Your total score is: {this.context.head.totalScore}</p>
        <p>You have answered this word correctly {this.context.head.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount} times.</p>
        </div>
        
      </div>
      )
    } else if (this.context.guess.isCorrect === true) {
      return (
        // this.handleCorrectAnswer()
        <div>
        <h3>You Are Correct!</h3>
        <p>The correct translation for {this.context.head.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
        <div className='DisplayScore'>
          <p>Your total score is: {this.context.guess.totalScore}</p>
          <p>You have answered this word correctly {this.context.head.wordCorrectCount + 1} times.</p>
          <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount} times.</p>
        </div>
        
        {/* <Button type='click' onClick={e => this.handleNextWord()}>Next Word</Button> */}
      </div>
      )
    } else if (this.context.guess.isCorrect === false) {
      return (
        // this.handleIncorrectAnswer()
        <div>
        <h3>You Are Incorrect!</h3>
        <p>The correct translation for {this.context.head.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
        <div className='DisplayScore'>
          <p>Your total score is: {this.context.guess.totalScore}</p>
        <p>You have answered this word correctly {this.context.head.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount + 1} times.</p>
        </div>
        {/* <Button type='click' onClick={e => this.handleNextWord()}>Next Word</Button> */}
      </div>
      )
    } else {
      return (<p>loading...</p>)
    }
  }
}