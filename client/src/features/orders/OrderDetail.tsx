import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from '../basket/BasketTable';

export default function OrderDetail(){
    const { id } = useParams<{ id: string }>();
    const [baskets,setBaskets] = useState<BasketItem[]>([]) 
    const [orderStatus,SetOrderStatus] = useState('');

    const [subTotalForOrders,SetSubTotalForOrders] = useState(0);
    

   useEffect(() =>{
    agent.Orders.fetch(parseInt(id))
    .then(response => {
        
        console.log(response);
        setBaskets(response.orderItems);
        SetOrderStatus(response.orderStatus);
        SetSubTotalForOrders((response.orderItems.reduce((sum : any, item : any) => sum + (item.quantity * item.price), 0) ?? 0).toFixed(2));
       console.log( 'subtotalForOrders = '  + subTotalForOrders);
    })
    .catch(error => console.log(error))

   },[id, subTotalForOrders])


    return (
        <>
          <Box display='flex' justifyContent='space-between'>
          <Typography variant='h4'  gutterBottom sx={{mb : 2}}> Order#  {id} - {orderStatus} </Typography>
                <Button component={Link} to={`/orders/`} variant='contained'  sx={{ m: 2 }}size='large' >Back to Orders</Button>
            </Box>
       
        

        <BasketTable items={baskets}  isBasket={false}/>

        <Grid container>
                <Grid item  xs={6} />
                <Grid item  xs={6} >
                    <BasketSummary subTotalForOrders ={((subTotalForOrders)/100 )} />

                </Grid>
            
            </Grid>
        </>

    )
}

