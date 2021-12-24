import { Button, ButtonGroup, Typography } from "@mui/material";
//import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";




export default function ContactPage() {

    //use selector is used to get the counter state
    //useSelector hook used to get the data or the state
    //to dispatch action we use useDispatch
   // const dispatch = useDispatch();
    const dispatch = useAppDispatch();
   // const { data, title } = useSelector((state: CounterState) => state)
    const { data, title } = useAppSelector((state) => state.counter)

    return (
        <>
            <Typography variant='h2'> {title}</Typography>
            <Typography variant='h5'> The data is {data}</Typography>

            <ButtonGroup>
                {/* <Button onClick={()  =>dispatch({type : DECREMENT_COUNTER})} variant='contained'  color='error'>Decrement</Button> */}

                <Button onClick={()  =>dispatch(decrement(1))} variant='contained'  color='error'>Decrement</Button>
                <Button onClick={()  =>dispatch(increment(1))}   variant='contained'  color='primary'>Increment</Button>
                <Button onClick={()  =>dispatch(increment(5))}   variant='contained'  color='secondary'>Increment by 5</Button>
            </ButtonGroup>


        </>
    )
}
