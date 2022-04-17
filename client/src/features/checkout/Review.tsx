import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';


export default function Review() {
  const {basket} = useAppSelector(state => state.basket)
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      {basket &&
      <BasketTable items={basket.items}  isBasket={false}/>}

            <Grid container>
                <Grid item  xs={6} />
                <Grid item  xs={6} >
                    <BasketSummary />

                </Grid>
            
            </Grid>
     
      {/* <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );
}
