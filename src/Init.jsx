import React from 'react';
import App from './Components/App';
import { Provider } from 'react-redux';
import store from './Slice/Store';

function Init() {
  return (
    <Provider store={store}>
     <App />
     </Provider>
  )
}

export default Init;
