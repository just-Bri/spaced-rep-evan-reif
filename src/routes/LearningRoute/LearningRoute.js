import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import LearningComponent from "../../components/LearningComponent/LearningComponent";

class LearningRoute extends Component {
  static contextType = UserContext;

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/language/head`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e));
        }
        // console.log(res)
        return res.json();
      })
      .then(res => {
        console.log(res)
        this.context.setHead(res);
      });
  }
  render() {
    return (
      <section>
        <LearningComponent />
      </section>
    );
  }
}

export default LearningRoute;
