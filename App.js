import React from 'react';
import { Provider } from 'react-redux';
//import Store from './store';//不知道為什麼store不可以從別的project塞入
import HomeScreen from './module/homeScreen';
import { configureStore } from "@reduxjs/toolkit";

import mainReducer from './module/mainModule/slice';

const Store = configureStore({
    reducer:{
        mainReducer,
    }
})

export default function App() {
  return (
    <Provider store={ Store }>
      <HomeScreen></HomeScreen>
    </Provider>
  );
}