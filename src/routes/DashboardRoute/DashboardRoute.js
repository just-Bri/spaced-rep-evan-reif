import React, { Component } from "react";
import TokenService from "../../services/token-service";
import config from "../../config";

export default class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: {
        head: "",
        id: "",
        name: "",
        total_score: "",
        user_id: "",
      },
      words: [],
    };
  }
  async componentDidMount() {
    const response = await fetch(`${config.API_ENDPOINT}/language`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    });
    const { language, words } = await response.json();
    await this.setState({
      language,
      words,
    });
  }

  render() {
    return <section>implement and style me</section>;
  }
}

// <div>
//   <h2>Latin</h2>
//   <p>Words</p>onClick =>
//   {
//     words.each =>
//     li word x/x
//   }
//   <p>start learning</p>
// </div>
