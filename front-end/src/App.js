import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import SearchPage from './components/SearchPage';
import ProductPage from './components/ProductPage';

import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // NavbarOpen: false,
      // backgroundColor: "rgba(0, 0, 0, 0)"
    }
  }

  // listenScrollEvent = e => {
  //   if (window.scrollY > 200) {
  //     this.setState({color: 'black'})
  //   } else {
  //     this.setState({color: 'rgba(0, 0, 0, 0)'})
  //   }
  // }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.listenScrollEvent)
  // }

  // NavbarClickHandler = () => {
  //   this.setState((prevsState) => {
  //     console.log("it works");
  //     return {NavbarOpen: !prevsState.NavbarOpen};
  //   });
  // };

  // BackdropClickHandler = () => {
  //   this.setState({NavbarOpen: false})
  // }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route
            path="/"
            exact render={(routerProps) => <LandingPage  
                                                        />} /> 
          <Route
            path="/signup"
            exact render={(routerProps) => <Register />} />
          <Route
            path="/search"
            exact render={(routerProps) => <SearchPage />} />
          <Route 
            path="/product"
            exact render={(routerProps) => <ProductPage />} />
          {/* 
          <Route
            path="/profile"
            exact render={(routerProps ) => <ProfilePage  />} />  
          <Route
            path="/admin"
            exact render={(routerProps ) => <AdminPage  />} />
          <Route
            path="/login"
            exact render={(routerProps ) => <Login  />} />   */}
        </Router>
      </React.Fragment>

    );
  }
}

  // NavbarClickHandler={this.NavbarClickHandler}
  // NavbarState={this.state.NavbarOpen} 
  // BackdropClickHandler={this.BackdropClickHandler}
  // backgroundColor={this.backgroundColor}