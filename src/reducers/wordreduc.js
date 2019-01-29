import {
  SET_SUBMISSION,
  SET_QUESTION,
  SET_ANSWER,
  SET_CORRECT,
  SET_SCORE
} from "../actions/submission";

const initialState = {
  answer: null,
  question: null,
  userInput: null,
  correct: null,
  score: 1
};

const wordReducer = (state = initialState, action) => {
  if (action.type === SET_SUBMISSION) {
    return Object.assign({}, state, {
      userInput: action.submission
    });
  }
  if (action.type === SET_ANSWER) {
    return Object.assign({}, state, {
      answer: action.answer
    });
  }
  if (action.type === SET_QUESTION) {
    return Object.assign({}, state, {
      question: action.question
    });
  }
  if (action.type === SET_CORRECT) {
    return Object.assign({}, state, {
      correct: action.correct
    });
  }
  if (action.type === SET_SCORE) {
    return Object.assign({}, state, {
      score: action.score
    });
  }
  return state;
};

export default wordReducer;
