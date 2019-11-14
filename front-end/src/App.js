import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
            exact render={(routerProps) => <LandingPage {...routerProps} 
                                                        />} /> 
          <Route
            path="/register"
            exact render={(routerProps) => <Register {...routerProps} />} />
          <Route
            path="/search"
            exact render={(routerProps) => <SearchPage {...routerProps} />} />
          <Route 
            path="/product/:id"
            exact render={(routerProps) => <ProductPage {...routerProps} />} />
          <Route
            path="/login"
            exact render={(routerProps ) => <Login {...routerProps} />} />
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
