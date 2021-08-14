import React from 'react';
import { Provider } from 'react-redux';
//import Store from './store';//不知道為什麼store不可以從別的project塞入
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from 'Module/mainModule/slice';
import MainScreen from 'Module/mainModule/mainScreen';
/* import { SafeAreaProvider } from 'react-native-safe-area-context'; */

const Store = configureStore({
    reducer:{
        mainReducer,
    }
})

export default function App() {
  return (
    <Provider store={ Store }>
        <MainScreen/>
    </Provider>
  );
}
