/* 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from ';

const AppDispatch = typeof store.dispatch;
const RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; */

const monthDay = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
}

export const monthToDays = (year, month) => {
    let days = 0;

    if(month === 2){
        if((((year) % 4) == 0 && ((year) % 100) != 0) || ((year) % 400) == 0){
            days = 29;
        }else{
            days = 28;
        }
    }else{
        days =  monthDay[month];
    }
    
    return days;
}