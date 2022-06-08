// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './styles/index.scss';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



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

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

