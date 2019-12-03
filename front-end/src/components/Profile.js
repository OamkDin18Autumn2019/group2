import React, { Component } from "react";
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Header from "./Header";
import OnSellProducts from './OnSellProducts';
import axios from "axios";
import styles from "../CSS/Profile.module.css";
import classNames from "classnames";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSaleItems: [
    
      ],

      historyItems: [
        
      ]
    };

    // this.state.currentSale = this.state.currentSaleItems.map(sale => {
    //   return (
    //     <tr>
    //       <td>{sale.name}</td>
    //       <td>$ {sale.price}</td>
    //       <td>{sale.quantity}</td>
    //       <td>{sale.dateTime}</td>
    //       <td className={styles.edit1}>
    //         <a href="./editProduct/2">Edit</a>
    //       </td>
    //       <td className={styles.delete1}>
    //         {" "}
    //         <a href="#">Delete</a>{" "}
    //       </td>
    //     </tr>
    //   );
    // });

    // this.state.history = this.state.historyItems.map(sale => {
    //   return (
    //     <tr>
    //       <td>{sale.name}</td>
    //       <td>$ {sale.price}</td>
    //       <td>{sale.quantity}</td>
    //       <td>{sale.dateTime}</td>
    //     </tr>
    //   );
    // });
  }

  componentDidMount = () => {
    let userId = parseInt(this.props.match.params.id);
    console.log("userId: " + userId);
    axios.get(`http://localhost:4000/v1/product/getByUserId/${userId}`,  {
      headers: {
        'x-access-token': this.props.user.token
      }
      // userId
    })
      .then(res => {
        console.log(res.data.rows);
        if (res.data.rows !== undefined) {
          this.setState({ currentSaleItems: res.data.rows});
        }
        console.log(this.state.currentSaleItems);
      })
      .catch(err => {
        console.log(err);
        return null;
      })
  }

  onClick = () => {
    // console.log(this.state.currentSaleItems);
    console.log(this.state.currentSaleItems.map(item => item.id));
  }

  render() {

    // let {path, url} = useRouteMatch();
    const url = this.props.match.url;
    const path = this.props.match.path;
    console.log("url: " + url);
    console.log(path);

    return (
      <div className={styles.ProfilePage}>
        <div className={styles.ProfileInfo}>
          <div className={styles.ProfileInfoNames}>
            <h5 className={styles.Username}> {this.props.user.username} </h5>
            <h6 className={styles.Email}> {this.props.user.email} </h6>
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
            <li> <Link to={`${url}/onSell`}> Currently on sell </Link> </li>
            <li> <Link to={`${url}/analytics`}> Analytics </Link> </li>
            <li> <Link to={`${url}/history`}> History </Link> </li>
          </ul>
        </div>
        <div className={styles.ProfileData}>
          <Switch>
            <Route path={`${url}/onSell`} render={ routerProps => <OnSellProducts {...routerProps} props={this.state.currentSaleItems} />} />  
            <Route path={`${url}/analytics`} component={OnSellProducts} /> 
            <Route path={`${url}/history`} component={OnSellProducts} />  
          </Switch>
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

                <div className={styles.username}>Dmitrii231</div>
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
    );
  }
}
