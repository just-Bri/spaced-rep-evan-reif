import React, { Component } from "react";
import TokenService from "../../services/token-service";
import { Link } from "react-router-dom";
import config from "../../config";
import "./DashboardRoute.css";
import UserContext from "../../contexts/UserContext";

export default class DashboardRoute extends Component {
  static contextType = UserContext;

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        return res.json();
      })
      .then(res => {
        this.context.setLanguage(res.language);
        this.context.setWords(res.words);
      });
  }

  render() {
    if (this.context.words.length === 0) {
      return <p>Loading...</p>;
    } else {
      return (
        <section className='language-section'>
          <h2 className='language-title'>{this.context.language.name}</h2>
          <p className='total-score'>
            Total correct answers: {this.context.language.total_score}
          </p>
          <h3 className='word-list-title'>Words to practice</h3>
          <ol>
            {this.context.words.map((word, i) => (
              <li key={i}>
                <h4>{word.original}</h4>
                <div className='correct-count'>correct answer count: {word.correct_count}</div>
                <div className='incorrect-count'>incorrect answer count: {word.incorrect_count}</div>
              </li>
            ))}
          </ol>
          <div className='start-button-div'>
            <Link to={"/learn"} className='start-button'>Start practicing</Link>
          </div>
        </section>
      );
    }
  }
}
