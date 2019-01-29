import { BASE_URL } from "../config";

/*
Set if the users last answer was correct or not
*/
export const SET_CORRECT = "SET_CORRECT";
export const setCorrect = correct => ({
  type: SET_CORRECT,
  correct
});

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
  const tempPromise = new Promise(function(resolve, reject) {
    console.log("hello");
    dispatch(setSubmission(answer));
    resolve();
  });
  if (answer === state().test.answer) {
    console.log(state());
    console.log(true);
    tempPromise.then(() => {
      dispatch(setCorrect(true));
      dispatch(setScore(state().test.score * 2));
      console.log(state().test);
      return;
    }).then(() => {

      dispatch(fetchNextWord());

    });
    //maybe change the array after we know it was right or wrong
    // could make an action that changes the array depending on the params we send in IE id , 1
  } else {
    console.log(false);
    tempPromise.then(() => {
      dispatch(setCorrect(false));
      dispatch(setScore(1));
      console.log(state().test);
      return;
    })
      .then(() => {

        dispatch(fetchNextWord());
      });

  }
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
Set Score actions
*/
export const SET_SCORE_LOADING = "SET_SCORE_LOADING";
export const setScoreLoading = () => ({
  type: SET_SCORE_LOADING
});

export const SET_SCORE = "SET_SCORE";
export const setScore = score => ({
  type: SET_SCORE,
  score
});

export const SET_SCORE_ERROR = "SET_SCORE_ERROR";
export const setScoreError = error => ({
  type: SET_SCORE_ERROR,
  error
});


export const SET_ID_LOADING = "SET_ID_LOADING";
export const setIdLoading = () => ({
  type: SET_ID_LOADING
});

export const SET_ID = "SET_ID";
export const setId = id => ({
  type: SET_ID,
  id
});

export const SET_ID_ERROR = "SET_ID_ERROR";
export const setIdError = error => ({
  type: SET_ID_ERROR,
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
      console.log(data.score);
      console.log(data.question);
      console.log(data.answer);
      dispatch(setQuestion(data.question));
      dispatch(setAnswer(data.answer));
      // create something that sets score
      dispatch(setScore(data.score));

      dispatch(setId(data._id));
    })
    .catch(err => {
      dispatch(setQuestionError(err));
    });
};

export const updateScore = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${BASE_URL}/users/submit`, {
    method: "PUT",
    headers: {
      // Provide our auth token as credentials
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      body: JSON.stringify({id: getState().test.id, score: getState().test.score})
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      dispatch(setQuestionError(err));
    });
};

/*
Create an action that fetches the new endpoint for questions
update the state
*/
