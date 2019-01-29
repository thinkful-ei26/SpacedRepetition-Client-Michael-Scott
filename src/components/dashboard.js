import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";
import "./css/dashboard.css";
import { fetchNextWord } from "../actions/submission";
import AnswerForm from "./answer-form";
import ScoreKeeper from "./score-keeper";

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchNextWord());
  }

  // create some function?

  render() {
    return (
      <div className="dashboard">
        <h1>Welcome {this.props.username}</h1>
        <img src="https://i.stack.imgur.com/34AD2.jpg" />
        <div className="customBr" />
        <div>
          <h3>Translate this word to Esperanto:</h3>
          <span>{this.props.question}</span>
        </div>
        <div className="customBr" />
        <div className="gridRow">
          <h3>Answer Here:</h3>
          <br />
          <AnswerForm />
          <ScoreKeeper />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName}`,
    question: state.test.question,
    answer: state.test.answer,
    userInput: state.test.userInput,
    correct: state.test.correct
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
