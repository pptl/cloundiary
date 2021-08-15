import React from 'react';
import { Provider } from 'react-redux';
//import Store from './store';//不知道為什麼store不可以從別的project塞入
//import mainReducer from 'Module/mainModule/slice';
import MainScreen from 'Module/mainModule/mainScreen';

import reducers from 'reducers';
import { createStore } from 'redux';


/* import { SafeAreaProvider } from 'react-native-safe-area-context'; */

const Store = createStore(reducers);

export { Store };

export default function App() {
  return (
    <Provider store={ Store }>
        <MainScreen/>
    </Provider>
  );
}
