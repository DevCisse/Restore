import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
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
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/features/Checkout";




function App() {

  const {setBasket} = useStoreContext();
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    const buyerId  = getCookie('buyerId');
    if(buyerId)
    {
      agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }
    else{
      setLoading(false);
    }
  },[setBasket])



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
          <Route path='/checkout' component={CheckoutPage} />

          <Route path='/test' component={Test} />
          <Route path="/not-found" component={NotFound} />
        </Switch>

        {/* <Catalog  /> */}
      </Container>



    </ThemeProvider>
  );
}

export default App;
