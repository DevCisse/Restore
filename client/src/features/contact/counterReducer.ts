export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState {
    data: number;
    title: string;
}


//when we create a reducer in redux we need to give it an intial state
//hence the intial state


const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter)'
}


//creating action creators

export function increment(amount : number  = 1)
{
    return{
        type:INCREMENT_COUNTER,
        payload:amount
    }
}

export function decrement(amount : number  = 1)
{
    return{
        type:DECREMENT_COUNTER,
        payload:amount
    }
}



//then we create our reducer function 
export default function counterReducer(state = initialState, action: any) {
    //actions are what we dipatch to our reducers to change state in some way 
    //we must always return state
    switch (action.type) {
        case INCREMENT_COUNTER:
            return{
                ...state,
                data: state.data + action.payload

            }

            case DECREMENT_COUNTER:
                return{
                    ...state,
                    data: state.data - action.payload
    
                }
     
            
    
        default:
            return state;
    }
}

