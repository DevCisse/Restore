import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
   // let  subtotal = 0;
    let deliveryFee = 0;

    let total = 0;
    

    const {basket} = useAppSelector(state => state.basket);

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



    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">${subTotal?.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{deliveryFee}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">${total.toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}