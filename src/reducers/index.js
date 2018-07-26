import { combineReducers } from 'redux';
import crosslist from './crosslist';
import user from './user';

export default combineReducers({
  crosslist,
  user,
});
