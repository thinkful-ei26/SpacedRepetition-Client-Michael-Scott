import React from "react";
import { connect } from "react-redux";

class ScoreKeeper extends React.Component {
  render() {
    return <div>Under construction</div>;
  }
}

const mapStateToProps = state => ({
  userInput: state.test.userInput
});

export default connect(mapStateToProps)(ScoreKeeper);
