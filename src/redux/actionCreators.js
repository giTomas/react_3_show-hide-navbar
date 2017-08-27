import actions from './actions';


function updateUIStatus(payload) {
  return {
    type: actions.UPDATE_UI_STATUS,
    payload,
  }
}

const actionCreators = {
  updateUIStatus,
}

export default actionCreators;
