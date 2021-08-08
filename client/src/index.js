import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {Provider} from 'react-redux'
import { authApi } from './features/authApi';
import reducer from './features/appSlice'


const store = configureStore({
  reducer:{
    [authApi.reducerPath]:authApi.reducer,
    app: reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(store.dispatch)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);