import React from "react";
import { connect } from "react-redux";

class ScoreKeeper extends React.Component {
  render() {
    console.log(this.props.correct);
    if (this.props.userInput !== null) {
      if (this.props.correct === true) {
        return <div>Nice, {this.props.userInput} is Correct</div>;
      } else {
        return <div>Incorrect {this.props.userInput}</div>;
      }
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  userInput: state.test.userInput,
  correct: state.test.correct
});

export default connect(mapStateToProps)(ScoreKeeper);
