//each react app has a single store

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
//import { createStore } from "redux";
import { basketSlice } from "../../features/basket/BasketSlice";
import { CatalogSlice } from "../../features/catalog/CatalogSlice";
//import {counterReducer } from "../../features/contact/counterReducer";
import { counterSlice } from "../../features/contact/counterSlice";

// export function configureStore()
// {
//     return createStore(counterReducer)
//    // return createStore(somethingReducer)
// }

export const store = configureStore({
    reducer : {
        counter : counterSlice.reducer,
        basket : basketSlice.reducer,
        catalog: CatalogSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const  useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;

