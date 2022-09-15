import { EventState, EventAction, EventActionEnum } from "./types";

const defaultState: EventState = {
  guests: [],
  events: [],
};

export default function EventReducer(
  state = defaultState,
  action: EventAction
): EventState {
  switch (action.type) {
    case EventActionEnum.SET_EVENTS:
      return { ...state, events: action.payload };
    case EventActionEnum.SET_GUESTS:
      return { ...state, guests: action.payload };
    default:
      return state;
  }
}
