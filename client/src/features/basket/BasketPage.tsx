import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";
//import LoadingComponent from "../../app/layout/LoadingComponent";
//import { Basket } from "../../app/models/basket";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

   

  //  const {basket,setBasket,removeItem}  =useStoreContext();
    const {basket}  = useAppSelector(state => state.basket);


    if (!basket) return <Typography variant='h3' >Your basket is empty</Typography>
    return (

        <>
            <BasketTable items={basket.items} />

            <Grid container>
                <Grid item  xs={6} />
                <Grid item  xs={6} >
                    <BasketSummary />

                    <Button
                    
                    component={Link}
                    to='/checkout'
                    variant='contained'
                    size='large'
                    fullWidth
                    
                    >
                        
                    Checkout    
                    </Button>
                </Grid>
            
            </Grid>
        </>


    )
}