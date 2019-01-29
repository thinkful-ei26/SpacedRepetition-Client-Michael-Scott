import React from "react";
import { connect } from "react-redux";

class ScoreKeeper extends React.Component {
  render() {
    if (this.props.correct) {
      console.log(this.props.correct);
      return <span>{this.props.userInput}: CORRECT</span>;
    } else if (this.props.correct === false) {
      console.log(this.props.correct);
      return <span>{this.props.userInput}: INCORRECT</span>;
    } else {
      console.log(this.props.correct);
      return (
        <span>
          {this.props.userInput} {this.props.correct}
        </span>
      );
    }
  }
}

const mapStateToProps = state => ({
  correct: state.test.correct,
  userInput: state.test.userInput
});

export default connect(mapStateToProps)(ScoreKeeper);
