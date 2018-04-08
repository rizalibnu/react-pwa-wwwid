import { combineReducers } from 'redux';
import feedReducer, {
  feedReducerHasErrored,
  feedReducerHasFailed,
  feedReducerIsLoading,
} from './feed';

export default combineReducers({
  feedReducer,
  feedReducerHasErrored,
  feedReducerHasFailed,
  feedReducerIsLoading,
});
