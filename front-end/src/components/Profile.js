import React, { Component } from "react";
import Header from "./Header";
import axios from "axios";
import styles from "../CSS/Profile.module.css";
import classNames from "classnames";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSaleItems: [
        {
          name: "Test name",
          price: "none",
          quantity: "As many as possible",
          dateTime: "Covert can't tell"
        },
        {
          name: "Test name 2",
          price: 45667,
          quantity: 90009,
          dateTime: "March 19, 2019"
        }
      ],

      historyItems: [
        {
          name: "Test name",
          price: "some",
          quantity: "As many as possible",
          dateTime: "Covert can't tell"
        },
        {
          name: "Test name 2",
          price: 45667,
          quantity: 90009,
          dateTime: "March 19, 2019"
        }
      ]
    };
    this.state.currentSale = this.state.currentSaleItems.map(sale => {
      return (
        <tr>
          <td>{sale.name}</td>
          <td>$ {sale.price}</td>
          <td>{sale.quantity}</td>
          <td>{sale.dateTime}</td>
          <td className={styles.edit1}>
            <a href="./editProduct/2">Edit</a>
          </td>
          <td className={styles.delete1}>
            {" "}
            <a href="#">Delete</a>{" "}
          </td>
        </tr>
      );
    });

    this.state.history = this.state.historyItems.map(sale => {
      return (
        <tr>
          <td>{sale.name}</td>
          <td>$ {sale.price}</td>
          <td>{sale.quantity}</td>
          <td>{sale.dateTime}</td>
          <td className={styles.edit1}>
            <a href="./editProduct/2">Edit</a>
          </td>
          <td className={styles.delete1}>
            {" "}
            <a href="#">Delete</a>{" "}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <>
        <Header />
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
                {this.state.currentSale}
              </table>
            </div>
            <br></br>
            <h2> You bought before</h2>
            <div style={{ overflowX: "auto" }}>
              <table className={styles.productTable}>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Date of buying</th>
                </tr>
                {this.state.history}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
