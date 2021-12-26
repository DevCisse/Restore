import { createSlice } from "@reduxjs/toolkit"


export interface CounterState {
    data: number;
    title: string;
    school : string;
}



const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter with redux toolkit)',
    school : 'Ahmadu Bello University'
}

// const secondState : CounterState ={
//     data : 45,
//     title : 'Another Second state'
// }



export const counterSlice  = createSlice({
    name : 'counter',
     initialState : initialState,
     reducers :{
         increment : (state,action) =>{
             state.data += action.payload;
         },

         decrement : (state,action) =>{
            state.data -= action.payload;
        },
     }
})


export const {increment,decrement} = counterSlice.actions;