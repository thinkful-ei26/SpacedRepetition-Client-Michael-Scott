import React from "react";
import { connect } from "react-redux";
import requiresLogin from "./requires-login";
import { fetchProtectedData } from "../actions/protected-data";
import "./css/dashboard.css";
import { fetchNextWord } from "../actions/submission";

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchNextWord());
  }

  render() {
    return (
      <div className="dashboard">
        <span>Welcome: {this.props.username}</span>
        <div className="gridRow">
          <span>Answer Here:</span>
          <input type="text" />
          <button type="submit">Submit</button>
        </div>
        <div>
          <span>{this.props.answer}</span>
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
    userInput: state.test.userInput
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
