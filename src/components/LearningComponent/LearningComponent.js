import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import LanguageApiService from '../../services/language-api-service';
import './LearningComponent.css';

export default class LearningComponent extends Component {
  state = {
    guess: null
  }

  static contextType = UserContext

  handleClick = e => {
    e.preventDefault();
    let guessValue = document.getElementById('learn-guess-input').value
    this.setState({
      guess: guessValue.trim(),
    });
    document.getElementById('learn-guess-input').value = '';
    LanguageApiService.postGuess(guessValue)
  }

  handleCorrectAnswer = () => {
    return (
      <div>
        <h3>You Are Correct!</h3>
        <p>The correct translation for {this.context.head.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
      </div>
    )

  }

  handleIncorrectAnswer = () => {
    return (
      <div>
        <h3>You Are Incorrect!</h3>
        <p>The correct translation for {this.context.head.nextWord} was {this.context.guess.answer} and you chose {this.state.guess}!</p>
      </div>
    )
  }

  render() {
    console.log(this.context)
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
            <Button type='submit' onClick={e => this.handleClick(e)}>
              Submit your answer
            </Button>
          </form>
          <p>
            Your total score is: {this.context.head.totalScore}
          </p>
          <p>
            You have answered this word correctly {this.context.head.wordCorrectCount} times.
          </p>
          <p>
            You have answered this word incorrectly {this.context.head.wordIncorrectCount} times.
          </p>
        </div>
    )
  }
}