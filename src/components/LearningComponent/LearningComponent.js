import React, { Component } from "react";
import Button from "../Button/Button";
import UserContext from "../../contexts/UserContext";
import LanguageApiService from "../../services/language-api-service";
import "./LearningComponent.css";
import buttonmp3 from './button_button.mp3';

export default class LearningComponent extends Component {
  state = {
    guess: null,
    guessed: false,
    response: null
  };

  

  static contextType = UserContext;

  play = () => {
    var audio = document.getElementById("audio");
    audio.play();
  };

  wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.play();
    this.wait(1500)
    let guessValue = document.getElementById("learn-guess-input").value;
    this.setState({
      guess: guessValue.trim(),
      guessed: true,
      currentWord: this.context.head.nextWord
    });
    document.getElementById("learn-guess-input").value = "";
    LanguageApiService.postGuess(guessValue).then(res =>
      this.context.setGuess(res)
    )
    
  };

  handleNextWord = () => {
    this.setState({
      guess: null,
      guessed: false
    });
    this.context.setHead("");
    LanguageApiService.getHead().then(res => {
      this.context.setHead(res);
    });
  };

  

  handleQuestion = () => {
    return (
      <div>
        <h2>Translate the word:</h2>
        <span className="next-word-text">{this.context.head.nextWord}</span>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="learn-guess-input">
            What's the translation for this word?
          </label>
          <input id="learn-guess-input" type="text" required/>
          <Button type="submit">Submit your answer</Button>
          {/* <audio ref={(input) => {this.audioRef = input}} src={buttonmp3} style={{ display: 'none' }} /> */}
          <audio id="audio" src={buttonmp3}></audio>
        </form>
        <div className="DisplayScore">
          <p>Your total score is: {this.context.head.totalScore}</p>
          <p>
            You have answered this word correctly{" "}
            {this.context.head.wordCorrectCount} times.
          </p>
          <p>
            You have answered this word incorrectly{" "}
            {this.context.head.wordIncorrectCount} times.
          </p>
        </div>
      </div>
    );
  };

  handleCorrectAnswer = () => {
    return (
      <>
        <div className="DisplayScore">
          <p>Your total score is: {this.context.guess.totalScore}</p>
          <h2>You were correct! :D</h2>
        </div>
        <div className="DisplayFeedback">
          <p>
            The correct translation for {this.context.head.nextWord} was{" "}
            {this.context.guess.answer} and you chose {this.state.guess}!
          </p>
        </div>
        <Button type="click" onClick={e => this.handleNextWord()}>
          Try another word!
        </Button>
      </>
    );
  };

  handleIncorrectAnswer = () => {
    return (
      <>
        <div className="DisplayScore">
          <p>Your total score is: {this.context.guess.totalScore}</p>
          <h2>Good try, but not quite right :(</h2>
        </div>
        <div className="DisplayFeedback">
          <p>
            The correct translation for {this.context.head.nextWord} was{" "}
            {this.context.guess.answer} and you chose {this.state.guess}!
          </p>
        </div>
        <Button type="click" onClick={e => this.handleNextWord()}>
          Try another word!
        </Button>
      </>
    );
  };

  render() {
    if (this.state.guessed === false) {
      return this.handleQuestion();
    } else if (this.context.guess.isCorrect === true) {
      return this.handleCorrectAnswer();
    } else if (this.context.guess.isCorrect === false) {
      return this.handleIncorrectAnswer();
    } else {
      return <p>loading...</p>;
    }
  }
}
