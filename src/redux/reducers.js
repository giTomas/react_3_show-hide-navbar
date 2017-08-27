import actions from './actions';

const initialState = {
  scrollY: 0,
  scrollDown: false,
  scrollUp: false,
  showElement: true,
}

function scrollStateReducer(state=initialState, action) {
  if (action.type === actions.UPDATE_UI_STATUS) {
    return {
      ...state,
      scrollY: action.payload,
      scrollDown: state.scrollY < action.payload,
      scrollUp: state.scrollY > action.payload,
      showElement: state.scrollY >= action.payload,
    };
  }
  else {
    return state;
  }
}

export default scrollStateReducer;
