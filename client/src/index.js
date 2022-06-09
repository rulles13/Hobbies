import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { legacy_createStore as createStore } from 'redux'

//dev tools
import { composeWithDevTools } from 'redux-devtools-extension';
import { getUser } from './actions/user.actions';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)
store.dispatch(getUser())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

