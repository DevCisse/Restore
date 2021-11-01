import {  Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}
export default function ProductCard({ product }: Props) {
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
                    ${(product.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                   {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add To Cart</Button>
                <Button size="small" component ={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}