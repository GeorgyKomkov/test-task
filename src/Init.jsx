import React from 'react';
import { Provider } from 'react-redux';
import App from './Components/App';
import store from './Slice/Store';

const Init = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Init;
