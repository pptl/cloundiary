import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 'home',
}

export const mainSlice = createSlice({
    name:'main',
    initialState,
    reducers: {
        setState(state,{ payload }){
            const {key, value} = payload;
            state[key] = value;
        },

        setPage (state, { payload }){
            state.page = payload;
        }
    }
})

const { actions, reducer } = mainSlice;

export const{
    setState,
    setPage,
} = actions;

/* 
export const getSome = () => asnyc(dispatch)=>{
    try{

    }catch(error){

    }
}
*/

export default reducer;