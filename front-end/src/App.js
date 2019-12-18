import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchPage from "./components/SearchPage";
import ProductPage from "./components/ProductPage";
import BasketPage from "./components/BasketPage";
import CreateProduct from "./components/CreateProduct";
import Profile from "./components/Profile";
import EditProduct from "./components/EditProduct";
import Cookie from "react-cookies";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: (Cookie.load("MOTHERSELLERSUSERID") !== '') ? Cookie.load("MOTHERSELLERSUSERID") : "",
        username: (Cookie.load("MOTHERSELLERSUSERNAME") !== '') ? Cookie.load("MOTHERSELLERSUSERNAME") : "",
        token: (Cookie.load("MOTHERSELLERSTOKEN") !== '') ? Cookie.load("MOTHERSELLERS") : ""
      },
      rememberMe: false,
      cart: []
        };
  }
  addToCart = (product, amountOfProduct) => {
    var currentCart = this.state.cart;
    var productToCart = {
      ...product,
      amountInTheCart: amountOfProduct
    };
    if (productToCart.discount !== 0) {
      productToCart.price = productToCart.price - productToCart.price * productToCart.discount / 100
    }
    console.log(currentCart, this.state.cart);

    if (this.state.cart.length === 0) {
      let newCart = [productToCart];
      this.setState({
        cart: this.state.cart.concat(newCart)
      });
      newCart = [];
    }
    for (let i = 0; i < currentCart.length; i++) {
      if (product.name === currentCart[i].name) {
        console.log("found");
        currentCart[i] = {
          ...productToCart
        };
        this.setState({
          cart: currentCart
        });
        break;
      } else {
        console.log("nothing");
        let newCart = [productToCart];
        this.setState({
          cart: this.state.cart.concat(newCart)
        });
        Cookie.save("MOTHERSELLERSCART", newCart, { path: "/" });
        newCart = [];
      }
    }
  };
  deleteCookies = () => {
    Cookie.save("MOTHERSELLERS", '', { path: "/" });
    Cookie.save("MOTHERSELLERSUSERNAME", '', { path: "/" });
    this.setState({
      user: {
        userId: "",
        username: "",
        token: ""
      }
    })
  }
  deleteFromCartById = id => {
    let currentCart = this.state.cart;
    for (let i = 0; i < currentCart.length; i++) {
      if (id === currentCart[i].id) {
        console.log("found");
        currentCart.splice(i, 1);
        this.setState({
          cart: currentCart
        });
        break;
      }
    }
    console.log(this.state.user)
  };

  updateCart = newCart => {
    this.setState({
      cart: newCart
    });
  };

  handleSubmit = async (un, pw, rm) => {
    const user = {
      username: un,
      password: pw
    };

    axios
      .post(`http://localhost:4000/v1/user/login`, { user })
      .then(async res => {
        // console.log(res);

        console.log(res.data);
        if (rm) {
          console.log("Remember me is active");
          Cookie.save("MOTHERSELLERSUSERID", res.data.user.id, { path: "/" });
          Cookie.save("MOTHERSELLERS", res.data.token, { path: "/" });
          Cookie.save("MOTHERSELLERSUSERNAME", user.username, { path: "/" });
        }
        this.setState({
          user: {
            userId: res.data.user.id,
            username: un,
            token: res.data.token
          }
        });
        // event.preventDefault();
        this.props.history.goBack();
        console.log(this.state.user);
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };

  render() {
    return (
      <React.Fragment>
        {console.log(this.state.user)}
        <Router>
          <Route
            path="/"
            render={routerProps => (
              <Header {...routerProps} user={this.state.user} deleteCookie={this.deleteCookies} />
            )}
          />

          <Route
            path="/"
            exact
            render={routerProps => (
              <LandingPage user={this.state.user} {...routerProps} />
            )}
          />


          <Route
            path="/createProduct"
            exact
            render={routerProps => (
              <CreateProduct {...routerProps} user={this.state.user} />
            )}
          />
          <Route
            path="/editProduct/:id"
            exact
            render={routerProps => (
              <EditProduct {...routerProps} user={this.state.user} />
            )}
          />
          <Route
            path="/profile/:id"
            exact
            render={routerProps => (
              <Profile {...routerProps} user={this.state.user} />
            )}
          />
          <Route
            path="/register"
            exact
            render={routerProps => <Register {...routerProps} />}
          />
          <Route
            path="/search"
            exact
            render={routerProps => (
              <SearchPage {...routerProps} user={this.state.user} />
            )}
          />
          <Route
            path="/product/:id"
            exact
            render={routerProps => (
              <ProductPage
                {...routerProps}
                user={this.state.user}
                cart={this.state.cart}
                addToCartGlobal={this.addToCart}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={routerProps => (
              <Login
                {...routerProps}
                user={this.state.user}
                handleSubmit={this.handleSubmit}
                handleClick={this.handleClick}
              />
            )}
          />
          <Route
            path="/basket"
            exact
            render={routerProps => (
              <BasketPage
                {...routerProps}
                user={this.state.user}
                cart={this.state.cart}
                updateCart={this.updateCart}
                deleteFromCartById={this.deleteFromCartById}
              />
            )}
          />
          <Route
            path="/profile"
            exact
            render={routerProps => (
              <Profile {...routerProps} user={this.state.user} />
            )}
          />
          {/* // <Route
          //   path="/admin"
          //   exact render={(routerProps ) => <AdminPage  />} />
          //    */}
        </Router>
      </React.Fragment>
    );
  }
}
