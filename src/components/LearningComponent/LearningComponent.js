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
  }

  static contextType = UserContext

  handleSubmit = e => {
    e.preventDefault();
    let guessValue = document.getElementById('learn-guess-input').value
    this.setState({
      guess: guessValue.trim(),
      guessed: true
    });
    // let guessBody = JSON.stringify(guessValue)
    document.getElementById('learn-guess-input').value = '';
    // let guessString = JSON.stringify(guessValue)
    // LanguageApiService.postGuess(guessString)
    LanguageApiService.postGuess(guessValue)
    // console.log(JSON.stringify(guessValue))
    console.log(this.context.guess)
  }

  handleNextWord = () => {
    this.setState({
      guess: null,
      guessed: false,
      correct: false
    })
  }

  handleQuestion = () => {
    return (
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
        <p>Your total score is: {this.context.head.totalScore}</p>
        <p>You have answered this word correctly {this.context.head.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.head.wordIncorrectCount} times.</p>
      </div>
  )
  }

  handleCorrectAnswer = () => {
    return (
      <div>
        <h3>You Are Correct!</h3>
        <p>The correct translation for {this.context.guess.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
        <p>The correct translation for {this.context.guess.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
        <p>Your total score is: {this.context.guess.totalScore}</p>
        <p>You have answered this word correctly {this.context.guess.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.guess.wordIncorrectCount} times.</p>
        <Button type='click' onClick={e => this.handleNextWord()}>Next Word</Button>
      </div>
    )

  }

  handleIncorrectAnswer = () => {
    return (
      <div>
        <h3>You Are Incorrect!</h3>
        <p>The correct translation for {this.context.guess.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
        <p>Your total score is: {this.context.guess.totalScore}</p>
        <p>You have answered this word correctly {this.context.guess.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.context.guess.wordIncorrectCount} times.</p>
        <Button type='click' onClick={e => this.handleNextWord()}>Next Word</Button>
      </div>
    )
  }

  render() {
    if (this.state.guessed === false) {
      return (
        this.handleQuestion()
      )
    } else if (this.state.guessed === true && this.state.correct === true) {
      return (
        this.handleCorrectAnswer()
      )
    } else if (this.state.guessed === true && this.state.correct === false) {
      return (
        this.handleIncorrectAnswer()
      )
    }
  }
}