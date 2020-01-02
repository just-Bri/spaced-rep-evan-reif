import React, { Component } from "react";
// import config from "../../config";
// import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import LearningComponent from "../../components/LearningComponent/LearningComponent";
import LanguageApiService from "../../services/language-api-service";

class LearningRoute extends Component {
  static contextType = UserContext;

  componentDidMount() {
    LanguageApiService.getHead()
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
