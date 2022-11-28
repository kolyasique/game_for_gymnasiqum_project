import { DECREMENT, INCREMENT, OBNULIT } from './boilerplates';

// action-generators
export function decrement(payload) {
  return {
    type: DECREMENT,
    payload,
  };
}

export function increment(payload) {
  return {
    type: INCREMENT,
    payload,
  };
}

export function obnulit() {
  return {
    type: OBNULIT,
    payload: 0,
  };
}
