import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route
            path="/"
            exact render={(routerProps) => <LandingPage  
                                                        />} /> 
          <Route
            path="/register"
            exact render={(routerProps) => <Register />} />
          <Route
            path="/search"
            exact render={(routerProps) => <SearchPage />} />
          <Route 
            path="/product"
            exact render={(routerProps) => <ProductPage />} />
          <Route
            path="/login"
            exact render={(routerProps ) => <Login  />} />
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

  // NavbarClickHandler={this.NavbarClickHandler}
  // NavbarState={this.state.NavbarOpen} 
  // BackdropClickHandler={this.BackdropClickHandler}
  // backgroundColor={this.backgroundColor}