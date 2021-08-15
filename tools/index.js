/* 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from ';

const AppDispatch = typeof store.dispatch;
const RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; */