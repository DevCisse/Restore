import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {  useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";
//import LoadingComponent from "../../app/layout/LoadingComponent";
//import { Basket } from "../../app/models/basket";
import BasketSummary from "./BasketSummary";
import { payWithPaystack } from "../../app/util/util";

export default function BasketPage() {




  //  const {basket,setBasket,removeItem}  =useStoreContext();
  let subtotal = 0;

    const {basket} = useAppSelector(state => state.basket);
    const {user} = useAppSelector(state => state.account);
    
    if (subtotal === undefined)
       subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
       

   // let  subtotal = 0;
    let deliveryFee = 0;

    let total = 0;
    

 //   const {basket} = useAppSelector(state => state.basket);

    //sum starts at zero

    const subTotal = Number(basket?.items.reduce((sum,item) =>sum + ((item.price / 100) * item.quantity), 0 ))

    console.log(subTotal?.toFixed(2))

    if(Number(subTotal?.toFixed(2))  > 100)
    {
        deliveryFee = 0;

    }
    else{
        deliveryFee = 5;
    }

    total = Number(subTotal?.toFixed(2)) + deliveryFee;

    const nairaEquiv = (total * 100 ) * 480;

    console.log(basket?.buyerId)



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
                    <Button
                    
                   
                    onClick={(e) => payWithPaystack(e,'shehu@mailinator.com',nairaEquiv)}
                    variant='contained'
                    size='large'
                    fullWidth
                    sx={{mt : 1}}
                    
                    >
                        
                        ₦ Pay with Paystack    
                    </Button>
                </Grid>
            
            </Grid>
        </>


    )
}