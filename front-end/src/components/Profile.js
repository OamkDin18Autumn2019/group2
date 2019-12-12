import React, { Component } from "react";
import OnSellProducts from './OnSellProducts';
import Analytics from './Analytics';
import History from './History';
import StarRatings from 'react-star-ratings';
import Loader from 'react-loader-spinner';
import LoaderStyle from '../CSS/Loader.module.css';
import styles from "../CSS/Profile.module.css"; 
import ButtonStyles from '../CSS/Buttons.module.css';
import InputStyles from '../CSS/InputFields.module.css';
import axios from "axios";
import classNames from "classnames";


// IMPORTANT TODO
// We have to add a button/link on this page
// to move to the place where
// user can create a new product

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSaleItems: [],
      historyItems: [],
      userInfo: [],
      showActiveTab: OnSellProducts,
      token: this.props.user.token
    };
  }

  componentDidMount() {
    console.log(this.props.user.token);
    axios.get(`http://localhost:4000/v1/user/da/getHistory`, {
      headers: {
        'x-access-token': this.props.user.token
      }
    })
      .then(res => {
        //The following line is to check the response JSON due to the weird structure of the response
        this.setState({ historyItems: res.data.rows });
      })
      .catch(err => {
        console.log(err);
        return null;
      })
    axios.get(`http://localhost:4000/v1/product/da/currentSellings/`, {
      headers: {
        'x-access-token': this.props.user.token
      }
    })
      .then(res => {
        //The following line is to check the response JSON due to the weird structure of the response
        this.setState({ currentSaleItems: res.data.rows });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
        return null;
      })
      axios.get(`http://localhost:4000/v1/user/`, {
        headers: {
          'x-access-token': this.props.user.token
        }
      })
        .then(res => {
          console.log(res);
          this.setState({userInfo: res.data.rows});
          console.log(this.state.userInfo);
          console.log(this.state.userInfo[0]);
          console.log(this.state.userInfo[0].created_at);
        })
        .catch(err => {
          console.log(err);
          return null;
        })
  }
  
  TabLoader = () => {
    console.log(this.props.user);
    const Name = this.state.showActiveTab;
    // console.log(<Name currentSaleItems={this.state.currentSaleItems} historyItems={this.state.historyItems} />);
    return <Name DeleteHandler={this.DeleteHandler} token={this.state.token} currentSaleItems={this.state.currentSaleItems} deleteFunction={this.deleteProduct} historyItems={this.state.historyItems} />
  }

  TabPickHandler = (event) => {
      // console.log(event.target.name);
      const components = [
        OnSellProducts,
        Analytics,
        History
      ];

      console.log(event.target.className);

      // components.map(component => console.log(component.name));
      components.map(component => {
        if (component.name == event.target.name) {
          const ChosenComponent = component;
          console.log(ChosenComponent);
          this.setState({showActiveTab: component});
          // if (event.target.name)
          // this.setState({})
          // this.TabLoader(ChosenComponent);
          // console.log("da");
        } 
      })    
  }

  DeleteHandler = (deleteId) => {
    let currentState = this.state.currentSaleItems;
    const removedElement = currentState.splice(currentState.indexOf(deleteId), 1);
    // console.log(removedElement);
    // console.log(currentState);
    this.setState({currentSaleItems: currentState});
  }

  render() {

    return (
      // <Router>
        <>
        {
        !this.state.userInfo[0] ? (
          <Loader 
            type="Triangle"
            color="#000"
            height={250}
            width={250}
            timeout={99000}
            className={LoaderStyle.Loader}
          />
        ) : (
        <div className={styles.ProfilePage}>
          <div className={styles.LinksAndPersonalData}>
            <div className={styles.ProfileInfo}>
              <div className={styles.ProfileInfoNames}>
                <h5 className={styles.Username}>  {this.state.userInfo[0].username} </h5>
                <h6 className={styles.Email}> {this.state.userInfo[0].email} </h6>
              </div>
              <div className={styles.BasicStatistics}>
                  <label> Your rating </label>
                  <p> {this.state.userInfo[0].ratingUser} </p>
                  {/* {console.log(this.state.userInfo)}
                  <StarRatings
                          starDimension='30px'
                          rating={this.state.userInfo[0].ratingUser}
                          starHoverColor='#6CCF6D'
                          starRatedColor='#19B51B'
                          starEmptyColor='black'
                          numberOfStars={5}
                          starSpacing='1px'
                  /> */}
              </div>
            </div>
            <div className={styles.SideNavBar}>
              <ul className={styles.SideBarUL}>
                <li> <span className={ButtonStyles.Test}> <a id={this.state.showActiveTab == OnSellProducts ? ButtonStyles.ActiveLink : "nonActive"} className={ButtonStyles.Link} onClick={this.TabPickHandler} name="OnSellProducts"> On sell </a> </span> </li>
                <li> <span className={ButtonStyles.Test}> <a id={this.state.showActiveTab == History ? ButtonStyles.ActiveLink : "nonActive"} className={ButtonStyles.Link} onClick={this.TabPickHandler} name="History"> History </a> </span> </li>
                {/* <li> <span className={ButtonStyles.Test}> <a id={this.state.showActiveTab == Analytics ? ButtonStyles.ActiveLink : "nonActive"} className={ButtonStyles.Link} onClick={this.TabPickHandler} name="Analytics"> Analytics </a> </span> </li> */}
              </ul>
            </div>
          </div>
          <div className={styles.ProfileData}>
              {this.TabLoader(this.state.showActiveTab)}
          </div>
        </div>
        )
        }
        </>
    );
  }
}