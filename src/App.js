import React, { Component } from 'react';
import AboutPage from './pages/aboutUs/aboutUs';
import './App.css';
import Header from "./components/header/header.jsx";
import HomePage from "./pages/home/home.jsx";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import AdminComponent from './components/admin/admin';
import ProductPage from './components/productPage/productPage.jsx'
import ShoppingCart from './components/productPage/shoppingCart';
import Account from './components/login/account';
import CartItem from './components/productPage/productCard/cartItem';
import ProductCard from './components/productPage/productCard/productCard';
import PresentationPage from './pages/presentation/presentation.jsx'

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#0080c5',
        accent:'#F44336'
    },
    secondary:{
        main:'#62bd1d'
    },
}
});


class App extends Component {
render() {
    return (
      <MuiThemeProvider theme={theme}>
            <BrowserRouter >
                <div>
                <Header />
                        <Route path='/products' exact component={HomePage}/>
                        <Route path='/productCard' exact component={ProductCard}/>
                        <Route path='/product'  component={ProductPage}/>
                        <Route path='/AboutUs' exact component={AboutPage}/>
                        <Route path='/Admin' exact component={AdminComponent}/>
                        <Route path='/cart' exact component={ShoppingCart}/>
                        <Route path='/cartItem' exact component={CartItem}/>
                        <Route path='/account' exact component={Account}/>
                        <Route path='/' exact component={PresentationPage}/>


                </div>
            </BrowserRouter>
            {/* <HomePage/> */}

           </MuiThemeProvider>

    );
  }
}

export default App;
