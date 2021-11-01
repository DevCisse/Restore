import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Route } from "react-router";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";




function App() {

  const[darkMode,setDarkMode] = useState(false);

  const palleteType = darkMode ? 'dark': 'light';

  const darkTheme = createTheme({
  palette: {
    mode: palleteType,
    background:{
      default: palleteType === 'light'? '#eaeaea' : '#121212'
    }
  },
});

const handleChange = () =>{
  
 setDarkMode(!darkMode)
}


  return (

    <ThemeProvider theme={darkTheme} >
      <CssBaseline />
      <Header  darkMode={darkMode} handleThemeChange={handleChange}   />
     

      <Container>
        <Route path='/' exact  component={HomePage}/>
        <Route path='/catalog' exact  component={Catalog}/>
        <Route path='/catalog/:id'  component={ProductDetails}/>
        <Route path='/about'  component={AboutPage}/>
        <Route path='/contact'  component={ContactPage}/>
        {/* <Catalog  /> */}
      </Container>




    </ThemeProvider>
  );
}

export default App;
