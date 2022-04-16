import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/Server";
import NotFound from "../errors/NotFound";
import { Switch } from "react-router-dom";
import Test from "../../features/Tests/Test";
import BasketPage from "../../features/basket/BasketPage";
//import { useStoreContext } from "../context/StoreContext";
import LoadingComponent from "./LoadingComponent";

import { fetchBasketAsync } from "../../features/basket/BasketSlice";
import { useAppDispatch } from "../store/configureStore";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Orders from "../../features/orders/Orders";
import OrderDetail from "../../features/orders/OrderDetail";




function App() {

  //const {setBasket} = useStoreContext();
   const dispatch = useAppDispatch();
  const [loading,setLoading] = useState(true);


  const  initApp = useCallback(async () =>
  {
    try {
      await dispatch(fetchCurrentUser())
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error)
    }
  },[dispatch])

  useEffect(() =>{
    // dispatch(fetchCurrentUser());
    // const buyerId  = getCookie('buyerId');
    // if(buyerId)
    // {
    //   agent.Basket.get()
    //   .then(basket => dispatch(setBasket(basket)))
    //   .catch(error => console.log(error))
    //   .finally(() => setLoading(false))
    // }
    // else{
    //   setLoading(false);
    // }

    initApp().then(() => setLoading(false))
  },[initApp])



  const [darkMode, setDarkMode] = useState(false);

  const palleteType = darkMode ? 'dark' : 'light';

  const darkTheme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212'
      }
    },
  });

  const handleChange = () => {

    setDarkMode(!darkMode)
  }


  if(loading)  return <LoadingComponent message = "Initializing app."/>

  return (

    <ThemeProvider theme={darkTheme} >
      <ToastContainer position='bottom-right' hideProgressBar={true} theme='colored' />

      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleChange} />
        

      <Container>

        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/catalog' exact component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage} />
          <PrivateRoute path='/checkout' component={CheckoutPage} />
          <PrivateRoute path='/orders' exact component={Orders} />
          <PrivateRoute path='/orders/:id'   component={OrderDetail} />
          <Route path='/Login' component={Login} />
          <Route path='/Register' component={Register} />

          <Route path='/test' component={Test} />
          <Route path="/not-found" component={NotFound} />
        </Switch>

        {/* <Catalog  /> */}
      </Container>



    </ThemeProvider>
  );
}

export default App;
