import { BASE_URL } from "../config";

/*
Set the users answer to the problem
*/
export const SET_SUBMISSION_LOADING = "SET_SUBMISSION_LOADING";
export const setSubmissionLoading = () => ({
  type: SET_SUBMISSION_LOADING
});

export const SET_SUBMISSION = "SET_SUBMISSION";
export const setSubmission = submission => ({
  type: SET_SUBMISSION,
  submission
});

export const SET_SUBMISSION_ERROR = "SET_SUBMISSION_ERROR";
export const setSubmissionError = error => ({
  type: SET_SUBMISSION_ERROR,
  error
});

export const userAnswer = answer => (dispatch, state) => {
  console.log(state().test.question);
  const authToken = state().auth.authToken;
  dispatch(setSubmission(answer));
  console.log("get it");
  fetch(`${BASE_URL}/users/submit`, {
    method: "PUT",
    headers: {
      // Provide our auth token as credentials
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ answer: answer })
  }).then(() => {
    console.log("get it");
    dispatch(fetchNextWord());
  });
};

/*
Set the answer
*/

export const SET_ANSWER_LOADING = "SET_ANSWER_LOADING";
export const setAnswerLoading = () => ({
  type: SET_ANSWER_LOADING
});

export const SET_ANSWER = "SET_ANSWER";
export const setAnswer = answer => ({
  type: SET_ANSWER,
  answer
});

export const SET_ANSWER_ERROR = "SET_ANSWER_ERROR";
export const setAnswerError = error => ({
  type: SET_ANSWER_ERROR,
  error
});

/*
Set the test word
*/
export const SET_QUESTION_LOADING = "SET_QUESTION_LOADING";
export const setQuestionLoading = () => ({
  type: SET_QUESTION_LOADING
});

export const SET_QUESTION = "SET_QUESTION";
export const setQuestion = question => ({
  type: SET_QUESTION,
  question
});

export const SET_QUESTION_ERROR = "SET_QUESTION_ERROR";
export const setQuestionError = error => ({
  type: SET_QUESTION_ERROR,
  error
});

/*
Fetch the word and the answer from the database
*/

export const fetchNextWord = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${BASE_URL}/users/next`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(setQuestion(data.question));
      dispatch(setAnswer(data.answer));
    })
    .catch(err => {
      dispatch(setQuestionError(err));
    });
};

/*
Create an action that fetches the new endpoint for questions
update the state
*/
