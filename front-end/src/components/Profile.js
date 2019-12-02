import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import styles from "../CSS/Profile.module.css";
import classNames from "classnames";
import { Link } from 'react-router-dom';

// IMPORTANT TODO
// We have to add a button/link on this page
// to move to the place where
// user can create a new product

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSaleItems: [],
      historyItems: []
    };
  }
  componentDidMount() {
    // let idProduct = parseInt(this.props.match.params.id);
    axios.get(`http://localhost:4000/v1/history/`, {
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
      })
      .catch(err => {
        console.log(err);
        return null;
      })
  }

  render() {
    return (
      <>

        <Header user={this.props.user} />
        <div className={styles.background}>
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
            <h2> Your are selling now</h2>
            <div style={{ overflowX: "auto" }}>
              <table className={styles.productTable}>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
                {this.state.currentSaleItems.map(sale => {
                  return (
                    <tr>
                      <td>{sale.name}</td>
                      <td>$ {sale.price}</td>
                      <td>{sale.amountOfProduct}</td>
                      <td>{sale.created_at.substr(0,10)}</td>
                      <td className={styles.edit1}>
                        <Link to={`/editProduct/${sale.id}`}>   Edit   </Link>
                      </td>
                      <td className={styles.delete1}>
                        {" "}
                        <a href="#">Delete</a>{" "}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <br></br>
            <h2> You bought before</h2>
            <div style={{ overflowX: "auto" }}>
              <table className={styles.productTable}>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Date of buying</th>
                </tr>
                {this.state.historyItems.map(sale => {
                  return (
                    <tr>
                      <td>{sale.name}</td>
                      <td>$ {sale.price * sale.amount}</td>
                      <td>{sale.amount}</td>
                      <td>{sale.created_at.substr(0, 10)}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
