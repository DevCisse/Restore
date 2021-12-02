import {  Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import LoadingButton from '@mui/lab/LoadingButton';
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormatter } from "../../app/util/util";

interface Props {
    product: Product;
}
export default function ProductCard({ product }: Props) {

    const {setBasket} = useStoreContext();

    const[loading,setLoading] =useState(false);
    

    function handleAddItem(productId: number)
    {
        setLoading(true);
        agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
    return (
        // <ListItem key={product.id}>  
        // <ListItemAvatar>
        //     <Avatar  src={product.pictureUrl}/>
        // </ListItemAvatar>
        // <ListItemText>
        //     {product.name} - {product.price}
        // </ListItemText>

        //  </ListItem>

        <Card>

            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor:'secondary.main'}} >
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
              
              title={product.name}
              titleTypographyProps={{
                  sx:{fontWeight:'bold',color:'primary.main'}
              }}
                
            />
            <CardMedia
                component="img"
                sx = {{ backgroundSize:'contain',bgcolor:'primary.light'}}
                image={product.pictureUrl}
                title= {product.name}
            />
            <CardContent>
                <Typography gutterBottom color='' variant="h5" component="div">
                    {currencyFormatter(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                   {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)} size="small"  >Add To Cart</LoadingButton>
                <Button size="small" component ={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}