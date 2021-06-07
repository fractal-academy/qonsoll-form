import ANSWERS_DISPATCH_EVENTS from './DispatchEventsTypes'

const AnswersContextReducer = (state, action) => {
  switch (action.type) {
    case ANSWERS_DISPATCH_EVENTS.ADD_ANSWER:
      return { ...state, [action.payload.question.id]: action.payload }
    default:
      return state
  }
}

export default AnswersContextReducer
