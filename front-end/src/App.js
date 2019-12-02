import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from './components/Header';
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Login from "./components/Login";
import SearchPage from "./components/SearchPage";
import ProductPage from "./components/ProductPage";
import BasketPage from "./components/BasketPage";
import CreateProduct from "./components/CreateProduct";
import Profile from './components/Profile';
import EditProduct from './components/EditProduct'


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

  handleSubmit = (un, pw) => {
    // console.log(this.state.user);
    console.log(un);
    console.log(pw);

    const user = {
      username: un,
      password: pw
    };

    axios
      .post(`http://localhost:4000/v1/user/login`, { user })
      .then(res => {

        console.log(res);
        console.log(res.data);
        console.log(this.state.user);
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
            render={routerProps => <Header {...routerProps} user={this.state.user} /> }
          />

          <Route
            path="/"
            exact
            render={routerProps => <LandingPage {...routerProps} user={ this.state.user } />}
          />
           <Route
            path="/createProduct"
            exact
            render={routerProps => <CreateProduct {...routerProps} user={ this.state.user } />}
          />
          <Route
            path="/editProduct/:id"
            exact
            render={routerProps => <EditProduct {...routerProps} user={ this.state.user } />}
          />
          <Route
            path="/profile/:id"
            exact
            render={routerProps => <Profile {...routerProps} user={ this.state.user } />}
          />
          <Route
            path="/register"
            exact
            render={routerProps => <Register {...routerProps} />}
          />
          <Route
            path="/search"
            exact
            render={routerProps => <SearchPage {...routerProps} user={ this.state.user } />}
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
                handleClick={this.handleClick}
              />
            )}
          />

          <Route
            path="/basket"
            exact
            render={routerProps => <BasketPage {...routerProps} user={ this.state.user } />}
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
