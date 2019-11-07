import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from './components/LandingPage';
// import SearchPage from './components/SearchPage';
// import ProfilePage from './components/ProfilePage';
// import AdminPage from './components/AdminPage';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Router>
          <Route
            path="/"
            exact render={(routerProps ) => <LandingPage  />} />
          {/* <Route
            path="/search"
            exact render={(routerProps ) => <SearchPage  />} />
          <Route
            path="/profile"
            exact render={(routerProps ) => <ProfilePage  />} />  
          <Route
            path="/admin"
            exact render={(routerProps ) => <AdminPage  />} />
          <Route
            path="/signup"
            exact render={(routerProps ) => <SignUp  />} />
          <Route
            path="/login"
            exact render={(routerProps ) => <Login  />} />   */}
        </Router>
      </React.Fragment>
      
    );
  }
}

