import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import OnSellProducts from './OnSellProducts';
import Analytics from './Analytics';
import History from './History';
import axios from "axios";
import styles from "../CSS/Profile.module.css"; 
import ButtonStyles from '../CSS/Buttons.module.css';
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
      activeTab: OnSellProducts
    };
  }
  componentDidMount() {
    // let idProduct = parseInt(this.props.match.params.id);
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
  }

  TabLoader = (ActiveTab) => {
    // console.log(ActiveTab);
    const Name = this.state.activeTab;
    console.log(<Name currentSaleItems={this.state.currentSaleItems} historyItems={this.state.historyItems} />);
    return <Name currentSaleItems={this.state.currentSaleItems} historyItems={this.state.historyItems} />
  }

  TabPickHandler = (event) => {
      console.log(event.target.name);
      const components = [
        OnSellProducts,
        Analytics,
        History
      ];

      components.map(component => console.log(component.name));
      components.map(component => {
        if (component.name == event.target.name) {
          const ChosenComponent = component;
          console.log(ChosenComponent);
          this.setState({activeTab: component});
          // this.TabLoader(ChosenComponent);
          console.log("da");
        } else {
          console.log("net")
        }
      })

      // console.log(this.state.activeTab);
      
  }


  render() {
    // console.log(this.components.map());
    console.log(this.state.activeTab[0])
    const url = this.props.match.url;
    const path = this.props.match.path;
    // console.log(this.state.activeTab);
    // console.log("url: " + url);
    // console.log(path);

    return (
      <Router>
        <>
        <div className={styles.ProfilePage}>
          <div className={styles.ProfileInfo}>
            <div className={styles.ProfileInfoNames}>
              <h5 className={styles.Username}> MotherSeller {this.props.user.username} </h5>
              <h6 className={styles.Email}> something@example.com {this.props.user.email} </h6>
            </div>
            <div className={styles.DescriptionContainer}>
              <p className={styles.Description}> 
                Lorem Ipsum motherseller. Here is the description of your page and yourself. 
                Some Other shit about that other shit that you like or might not like I do not even care
                You just need to do this or otherwise I will start reading Hitler's book MeinKampf 
                So you better know your place you piece of undercode.
              </p>
            </div>
            <div className={styles.BasicStatistics}>
              <div className={styles.BasicStatisticsElement}>
                <label> Your rating </label>
                {/* <h6> {this.state.user.rating} </h6> */}
                <h6> Here lies the user rating </h6>
              </div>
              <div className={styles.BasicStatisticsElement}>
                <label> Products Sold </label>
                <h6> Here lies the number of products the user sold </h6>
              </div>
              <div className={styles.BasicStatisticsElement}>
                <label> Registered Since </label>
                <h6> Here lies the data of registration of the user </h6>
              </div>
              <div className={styles.BasicStatisticsElement}>
                <label> You are this many days with us </label>
                <h6> Here lies the number of days the user is with us </h6>
              </div>
            </div>
          </div>
          <div className={styles.SideNavBar}>
            <ul className={styles.SideBarUL}>
              <li> <a className={ButtonStyles.Link} onClick={this.TabPickHandler} name="OnSellProducts"> Currently on sell </a> </li>
              <li> <a className={ButtonStyles.Link} onClick={this.TabPickHandler} name="Analytics"> Analytics </a> </li>
              <li> <a className={ButtonStyles.Link} onClick={this.TabPickHandler} name="History"> History </a> </li>
            </ul>
          </div>
          <div className={styles.ProfileData}>
              {this.TabLoader(this.state.activeTab)}
          </div>
          
        
        {/* <div style={{ overflowX: "auto" }}>
              {
                // let products = this.state.currentSaleItems;
                this.state.currentSaleItems.map(product => {
                  return <OnSellProduct {...product} />
                } ) 
              } 
        </div> */}
      
        {/* <div className={styles.background} onClick={this.onClick}>
          <div className={styles.container}>
            <h2> Profile</h2>
            <div className={styles.personalInfo}>
              <div className={styles.profileInfoBlock}>
                <img
                  className={classNames(styles.profileImg, styles.inline)}
                  alt="profileImg"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
                ></img>

                <div className={styles.username}>{ this.props.user.username}</div>
              </div>
              <div className={styles.profileInfoBlock}>
                <img
                  className={classNames(styles.profileImg, styles.inline)}
                  alt="email"
                  src="https://www.stickpng.com/assets/images/584856b4e0bb315b0f7675ac.png"
                ></img>

                <div className={styles.username}>Dmitrii231@mail.ru</div>
              </div>
            </div>
            <br></br>
            <h2> On sell products</h2> */}



              {/* <table className={styles.productTable}>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
                {this.state.currentSale}
              </table> */}
            {/* </div>
            <br></br>
            <h2> History</h2>
            <div style={{ overflowX: "auto" }}> */}
              {/* <table className={styles.productTable}>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Date of buying</th>
                </tr>
                {this.state.history}
              </table> */}
            {/* </div>
          </div>
        </div> */}
        </div>
        </>
      </Router>
      
    );
  }
}