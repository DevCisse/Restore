import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router";

export default function ServerError() {

    const history = useHistory();
    const { state } = useLocation<any>();

    return (
        <Container component={Paper}>

            {state?.error ? (
                <>
                    <Typography gutterBottom color='error' variant='h3'>{state.error.title}</Typography>
                    <Divider />

                    <Typography >{state.error.detail || 'internal server error'}</Typography>
                </>

            ) : (
                <Typography variant='h5'>Server Error</Typography>

            )}
            <Button onClick={() => history.push('/catalog')}> Go back to store</Button>
        </Container>
    )
}