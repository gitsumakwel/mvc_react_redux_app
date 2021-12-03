import {statusState} from './state';
import {
  COURSEWORX,
  ABOUT,
  PROJECT,
  BLOG,
  CONTACT,
} from './constants'

const statusReducer = (state = statusState, action) => {
  const newState = Object.assign({},state);
  switch (action.type) {
    case COURSEWORX:
      newState.inputcourseworx = action.inputcourseworx;
      return newState;
    case ABOUT:
      newState.inputabout = action.inputabout;
      return newState;
    case PROJECT:
      newState.inputproject = action.inputproject;
      return newState;
    case BLOG:
      newState.inputblog = action.inputblog;
      return newState;
    case CONTACT:
      newState.togglecontact = !newState.togglecontact;
      return newState;
    default:
      return state;
  }
}

export {
  statusReducer,
}
