import { combineReducers } from "redux";
import assign from 'object-assign'
import mainReducer from 'Module/mainModule/slice';
/* 
const reducers = {
    mainReducer,
} */
const rootReducer = combineReducers({
    mainReducer,
});

/* const combineReducer = ( reducer ) => {
    if( typeof reducer === 'object' ){
        const reducerKeys = Object.keys(reducer);
        for( let i = 0; i < reducerKeys.length; i++ ){
            if( typeof reducers[reducerKeys[i]] === 'undefined' ){
                const insertReducer = {};
                insertReducer[reducerKeys[i]] = reducer[reducerKeys[i]];
                return combineReducers(assign(reducers, insertReducer));
            }
        }
    }

    const appReducer = combineReducers(reducers);
    return (state, action)=>{
        let newState = state;
        if(action.type === 'APP_RESET_REDUCER'){
            newState = undefined;
        }
        return appReducer(newState, action);
    }
}
 */
export default rootReducer;


