import { INCREMENT, DECREMENT, OBNULIT } from './boilerplates';

export default function reducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        counter: state.counter + action.payload,
      };
    case DECREMENT:
      return {
        counter: state.counter - action.payload,
      };
    case OBNULIT:
      return {
        counter: 0,
      };
    default: return { ...state };
  }
}
