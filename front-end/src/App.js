import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchPage from "./components/SearchPage";
import ProductPage from "./components/ProductPage";
import BasketPage from "./components/BasketPage";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        token: "",
      }
    };
  }

  handleChange = (username, password) => {
    console.log(username);
    this.setState({
      user: {
        username,
        password
      }
    });
  };

  handleSubmit = () => {
    console.log(this.state.user);

    const user = {
      username: this.state.user.username,
      password: this.state.user.password
    };

    axios
      .post(`http://localhost:3000/v1/user/login`, { user })
      .then(res => {
        this.setState({
          user:{ 
            username: res.data.user.username,
            token: res.data.token
          }
         
        })
        console.log(this.state);
        // console.log(res.data);
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
            exact
            render={routerProps => <LandingPage {...routerProps} />}
          />
          <Route
            path="/register"
            exact
            render={routerProps => <Register {...routerProps} />}
          />
          <Route
            path="/search"
            exact
            render={routerProps => <SearchPage {...routerProps} />}
          />
          <Route
            path="/product/:id"
            exact
            render={routerProps => <ProductPage {...routerProps} user = {this.state.user} />}
          />
          <Route
            path="/login"
            exact
            render={routerProps => (
              <Login
                {...routerProps}
                user={this.state.user}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
              />
            )}
          />

          <Route
            path="/basket"
            exact
            render={routerProps => <BasketPage {...routerProps} />}
          />
          {/* 
          <Route
            path="/profile"
            exact render={(routerProps ) => <ProfilePage  />} />  
          <Route
            path="/admin"
            exact render={(routerProps ) => <AdminPage  />} />
             */}
        </Router>
      </React.Fragment>
    );
  }
}
