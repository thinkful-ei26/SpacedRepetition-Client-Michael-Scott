import React from "react";
import { Field, reduxForm, focus, reset } from "redux-form";
import { userAnswer } from "../actions/submission";
import Input from "./input";

//submitAnswer(answer)
export class AnswerForm extends React.Component {
  onSubmit(answer) {
    //console.log("the submission is ", answer);
    this.props.dispatch(reset("answer"));
    return this.props.dispatch(userAnswer(answer.answer));
  }

  render() {
    return (
      <div>

        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        >

          <Field component={Input} type="text" name="answer" />
          <br />
          <button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}
          >
          Submit
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "answer",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("answer", Object.keys(errors)[0]))
})(AnswerForm);
