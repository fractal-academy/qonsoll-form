import DISPATCH_EVENTS from './DispatchEventsTypes'

const formContextReducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_EVENTS.ADD:
      return [...state, action.payload]
    default:
      return state
  }
}

export default formContextReducer
