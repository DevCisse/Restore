import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';



const theme = createTheme();

export default function Login() {
  const history = useHistory();
  const location  = useLocation<any>();
  const dispatch = useAppDispatch();

  const {register,handleSubmit,formState:{isSubmitting,errors,isValid}} = useForm(
    {
      mode : 'all'
    }
  );

    // const [values,setValues]  = useState({
    //     username: '',
    //     password :''
    // })
  // const handleSubmit = (event:any) => {
  //    // console.log(values);
  //    event.preventDefault();
  //     agent.Account.login(values);
      
  // };

  // function handleInputChange(event :any)
  // {
  //     const {name ,value} = event.target ;
  //     setValues({...values,[name]:value})
  // }

   async function submitForm(data:FieldValues)
    {
     try {
      await dispatch(signInUser(data));
      history.push(location.state?.from?.pathname || '/catalog')
     } catch (error) {
       console.log(error);
       
     }
   


    }

  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} maxWidth="sm" sx={{
          display:'flex',flexDirection:'column',
          alignItems:'center',p:4
      }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
             
              fullWidth      
              label="Username"
             
              {...register('username',{required : 'Username is required'})}
              
              autoFocus
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
             
              label="Password"
              type="password"
              id="password"       
              {...register('password',{required : 'Password is required'})}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Container>
    </ThemeProvider>
  );
}