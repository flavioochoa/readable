import { combineReducers, createStore  } from 'redux';
import categories from './Categories';
import posts from './Posts';
import notification from './Notification';
const Reducers = combineReducers({
    categories,
    posts,
    notification,
});

export default createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
