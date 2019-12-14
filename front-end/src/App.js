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
        username: "",
        password: "",
        token: Cookie.load("MOTHERSELLERS")
      },
      cart: []
    };
  }
  addToCart = (product, amountOfProduct) => {
    var currentCart = this.state.cart;
    var productToCart = {
      ...product,
      amountInTheCart: amountOfProduct
    };
    console.log(currentCart, this.state.cart);

    if (this.state.cart.length == 0) {
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

        newCart = [];
      }
    }
    console.log(this.state.cart);
  };

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
  };

  updateCart = newCart => {
    this.setState({
      cart: newCart
    });
    console.log(this.state.cart);
  };

  handleSubmit = async (un, pw) => {
    const user = {
      username: un,
      password: pw
    };

    axios
      .post(`http://localhost:4000/v1/user/login`, { user })
      .then(async res => {
        // console.log(res);

        console.log(res.data);
        Cookie.save("MOTHERSELLERS", res.data.token, { path: "/" });

        this.setState({
          user: {
            username: un,
            password: pw,
            token: res.data.token
          }
        });
        // event.preventDefault();
        this.props.history.goBack();
        // console.log(this.state.user);
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route
            path="/"
            render={routerProps => (
              <Header {...routerProps} user={this.state.user} />
            )}
          />

          {this.state.user.token ? (
            <Route
              path="/"
              exact
              render={routerProps => (
                <Profile user={this.state.user} {...routerProps} />
              )}
            />
          ) : (
            <Route
              path="/"
              exact
              render={routerProps => (
                <LandingPage user={this.state.user} {...routerProps} />
              )}
            />
          )}

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
